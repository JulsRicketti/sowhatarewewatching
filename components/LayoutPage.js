import React from 'react'
import { Head } from './Head'

export function LayoutPage ({ title, pageId, children }) {
  return (
    <div id={pageId || 'page'} className='page' style={{ padding: 20 }}>
      <Head title={title} />
      {children}
    </div>
  )
}
