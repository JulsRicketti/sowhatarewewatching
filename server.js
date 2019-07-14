// Make URL class global
require('./URL')

const express = require('express')
const next = require('next')
const helmet = require('helmet')
const Config = require('./config')
const Logger = require('./logger')
const {
  PORT,
  NEXT_DEV,
  ALLOW_CRAWLERS
} = Config

const dev = NEXT_DEV
const app = next({ dev, quiet: false })
const handle = app.getRequestHandler()

function init () {
  return app
    .prepare()
    .then(() => {
      const server = express()
      server.set('trust proxy', true)

      server.use(helmet({
        hsts: {
          maxAge: 31536000
        }
      }))

      server.get('/robots.txt', function (req, res) {
        const disallow = ALLOW_CRAWLERS
          ? 'Allow: /'
          : 'Disallow: /'
        res.set('Content-Type', 'text/plain').send([
          'User-agent: *',
          disallow
        ].join('\n'))
      })

      // Parse Forwarded Headers

      server.use(function parseXForwardedHeaders (req, res, next) {
        const { headers } = req

        // The proxy server sets multiple values to these headers so we just take the
        // left-most value from each header only.

        if (headers['x-forwarded-host']) {
          headers['x-forwarded-host'] = headers['x-forwarded-host'].split(/\s*,\s*/)[0]
        }
        if (headers['x-forwarded-proto']) {
          headers['x-forwarded-proto'] = headers['x-forwarded-proto'].split(/\s*,\s*/)[0]
        }
        if (headers['x-forwarded-url']) {
          headers['x-forwarded-url'] = headers['x-forwarded-url'].split(/\s*,\s*/)[0]
        }

        next()
      })

      // Fix req.host getter

      server.use((req, res, next) => {
        // This replicates the corrected behavior found in Express 5.x
        Object.defineProperty(req, 'host', {
          configurable: true,
          enumerable: true,
          get: function host () {
            var trust = this.app.get('trust proxy fn')
            var val = this.get('X-Forwarded-Host')

            if (!val || !trust(this.connection.remoteAddress, 0)) {
              val = this.get('Host')
            }

            return val || undefined
          }
        })

        next()
      })

      // Routing

      server.get('*', handle)

      return new Promise((resolve, reject) => {
        const nodeServer = server.listen(PORT, (err) => {
          if (err) {
            reject(err)
          } else {
            Logger.info(`> Ready on http://localhost:${PORT}`)
            resolve(nodeServer)
          }
        })
      })
    })
}

exports.init = init

if (require.main === module) {
  init().catch(error => {
    Logger.error(error.toString(), error)
    process.exit(1)
  })
}
