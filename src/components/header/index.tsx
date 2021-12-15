import React from 'react'
import { Link } from 'react-router5'

import './_index.scss'

function HeaderComponent () {
  return (
    <div className="component -header">
      <nav>
        <div>
          <a href="https://github.com/gkshi" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div>
          <Link routeName="about">about</Link>
        </div>
      </nav>
    </div>
  )
}

export default HeaderComponent
