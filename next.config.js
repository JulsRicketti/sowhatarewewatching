const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

const commonsChunkConfig = (config, test = /\.css$/) => {
  config.plugins = config.plugins.map(plugin => {
    if (
      plugin.constructor.name === 'CommonsChunkPlugin' &&
          // disable filenameTemplate checks here because they never match
          // (plugin.filenameTemplate === 'commons.js' ||
          //     plugin.filenameTemplate === 'main.js')
          // do check for minChunks though, because this has to (should?) exist
          plugin.minChunks != null
    ) {
      const defaultMinChunks = plugin.minChunks
      plugin.minChunks = (module, count) => {
        if (module.resource && module.resource.match(test)) {
          return true
        }
        return defaultMinChunks(module, count)
      }
    }
    return plugin
  })
  return config
}

module.exports = withSass(withCss({
  cssModules: false,
  poweredByHeader: false,
  webpack: (config, options) => {
    const { isServer } = options

    config.plugins = config.plugins || []

    config = commonsChunkConfig(config, /\.(sass|scss|css)$/)

    // See: http://bit.ly/2oyDi50
    const env = process.env // eslint-disable-line
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': Object.keys(env).reduce((o, key) => {
          return Object.assign(o, { [key]: JSON.stringify(env[key]) })
        }, {})
      })
    )

    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
      loader: 'file-loader',
      options: {
        publicPath: '/_next/static/',
        outputPath: 'static/'
      }
    })

    // Disable caching for babel-loader, solves issues with .env vars getting stuck
    // Reference: https://github.com/zeit/next.js/issues/1103#issuecomment-279529809
    config.module.rules = config.module.rules.map(rule => {
      if (rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })

    // Used by config.js
    if (!isServer) {
      process.env.BUILD_ENV = 'client'
    }

    return config
  }
}))
