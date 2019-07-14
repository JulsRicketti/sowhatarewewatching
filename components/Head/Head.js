import React from 'react'
import PropTypes from 'prop-types'
import { default as NextHead } from 'next/head'
import '../../scss/styles.scss'

export default class Head extends React.Component {
  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    title: ''
  }

  render () {
    const { title } = this.props

    return (
      <NextHead>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <title>So... What are we watching?</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Finally discover what you will be watching tonight'/>

        <link href='https://placekitten.com/60/60' rel='icon shortcut' type='image/png' />
        <link rel='stylesheet' type='text/css' href='//fonts.googleapis.com/css?family=Quattrocento+Sans:400,700|Quattrocento:400,700' />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel='stylesheet' href='/_next/static/style.css' />

        <script src='https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,URL' />

        <script
          dangerouslySetInnerHTML={{ __html: [
            'document.documentElement.classList.remove("no-js")'
          ].join('\n') }}
        />
      </NextHead>
    )
  }
}
