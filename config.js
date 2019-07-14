/* eslint no-process-env: "off" */

let config = {}

config.X_RAPID_API_BASE_URL = process.env.X_RAPID_API_BASE_URL
config.X_RAPID_API_HOST = process.env.X_RAPID_API_HOST
config.X_RAPID_API_KEY = process.env.X_RAPID_API_KEY

// All the above env vars are required
Object.keys(config).forEach(key => {
  const value = config[key]
  if (value === undefined) {
    throw new Error(`${key} is required`)
  }
})

// Only set PORT on the server (see next.config.js)
if (process.env.BUILD_ENV !== 'client') {
  config.PORT = process.env.PORT || 3000
}

config.NEXT_DEV = JSON.parse(process.env.NEXT_DEV || 'false')
config.NODE_ENV = process.env.NODE_ENV
config.ALLOW_CRAWLERS = process.env.ALLOW_CRAWLERS === 'true'

module.exports = config
