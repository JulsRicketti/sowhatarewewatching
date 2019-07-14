import { mapProps } from 'recompose'
import { translateUrlByHostname } from '@gradealabs/translate-url'
import * as Config from '../config'

export default function withTranslateUrl () {
  return mapProps(props => {
    const { lang } = props

    if (!lang) {
      throw new Error('withTranslateUrl requires props.lang')
    }

    return Object.assign({}, props, {
      translateUrl (url, fromLang = 'en', toLang = lang) {
        const { ROOT_HOSTNAME: rootHostname } = Config

        // Only accept absolute URLs. This will throw otherwise.
        const urlStr = url.toString()
        const theUrl = new URL(urlStr)
        const translatedUrl = translateUrlByHostname(theUrl, fromLang, toLang, { rootHostname }).toString()

        // If the original URL did not have a trailing slash, nor should the
        // translated URL, which the URL library automatically adds
        const fixedTranslatedUrl = urlStr.substr(-1) !== '/' && translatedUrl.substr(-1) === '/'
          ? translatedUrl.slice(0, -1)
          : translatedUrl

        return fixedTranslatedUrl
      }
    })
  })
}
