import React from 'react'
import {
  CHeader,
  CHeaderNav,
} from '@coreui/react'

import { TheHeaderDropdown }  from './index'

const TheHeader = (props) => {
  return (
    <CHeader withSubheader>
      <CHeaderNav className="px-3">
        <TheHeaderDropdown avt={props.avt}/>
      </CHeaderNav>

    </CHeader>
  )
}

export default TheHeader
