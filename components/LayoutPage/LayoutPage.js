import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import Head from '../Head'

export default class LayoutPage extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    pageId: PropTypes.string,
    children: PropTypes.node
  }

  componentDidMount () {
    $(function () {
      $("a[href^='#']").on('click', function (e) {
        e.preventDefault()

        var hash = this.hash
        var $hashTarget = $(hash)
        var $header = $('#z6-header')

        $('html, body').animate({
          scrollTop: (
            $hashTarget.offset().top -
            parseInt($hashTarget.css('marginTop'), 10) -
            ($header.length ? $header.height() : 0)
          )
        }, 500)
      })
    })
  }

  render () {
    const { title, pageId, children } = this.props

    return (
      <div id={pageId || 'page'} className='page'>
        <Head title={title} />
        {children}
      </div>
    )
  }
}
