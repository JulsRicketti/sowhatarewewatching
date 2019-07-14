/**
 * Exposes functions for use with the withGetInitialProps HOC function.
 */
import * as qs from 'qs'

export function getReferer () {
  return ({ req }) => {
    const referrer = req
      ? req.headers['referer']
      : document.referrer

    return { referrer }
  }
}

export function getQueryParams (mapQueryParams) {
  return ({ req }) => {
    /* globals location */
    let query = {}

    if (req) {
      query = req.query || {}
    } else if (typeof location !== 'undefined') {
      query = qs.parse(location.search.slice(1))
    }

    return mapQueryParams(query)
  }
}
