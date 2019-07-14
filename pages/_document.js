import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class extends Document {
  static async getInitialProps ({ renderPage, res, req }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()

    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
      <html className='no-js'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
