import React, { useState, useEffect } from 'react'
import { LayoutPage } from './LayoutPage'
import PropTypes from 'prop-types'
import { findShowsByGenre } from '../util/api'
import { getCountryList, alphabeticalSort } from '../util'
import { Button, Select } from 'antd'

export function PageHome () {
  const [countries, setCountries] = useState([])
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     const result = await getCountryList()
  //     console.warn('RESULT', result)
  //     setCountries(result)
  //   }
  //   fetchCountries()
  // }, [])

  return (
    <LayoutPage pageId='homepage'>
      <h2>So... What should we watch?</h2>
      {/* <Select>
        {countries.map(x => <Select.Option key={x}>{x}</Select.Option>)}
      </Select> */}
      {/* <Button onClick={(evt) => this.testApi(evt)}>Test api</Button> */}
    </LayoutPage>
  )
}
