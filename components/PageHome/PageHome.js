import React from 'react'
import LayoutPage from '../LayoutPage'
import PropTypes from 'prop-types'
import { findShowsByGenre } from '../../util/api'

export default class PageHome extends React.PureComponent {
  static propTypes = {
  }

  // testApi (evt) {
  //   evt.preventDefault()
  //   console.warn('CLICK!!')
  //   findShowsByGenre()
  // }

  render () {
    return (
      <LayoutPage pageId='homepage'>
        <h2>So... What should we watch?</h2>
        <button onClick={(evt) => this.testApi(evt)}>Test api</button>
      </LayoutPage>
    )
  }
}
