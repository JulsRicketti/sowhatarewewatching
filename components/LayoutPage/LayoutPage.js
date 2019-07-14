import React from 'react'
import PropTypes from 'prop-types'
import Head from '../Head'

export default class LayoutPage extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    pageId: PropTypes.string,
    children: PropTypes.node
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
