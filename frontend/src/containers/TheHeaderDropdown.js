import React from 'react'
import {
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import Logout from 'src/views/button/Logout'

const TheHeaderDropdown = (props) => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={props.avt}
            className="c-avatar-img"
            alt="admin@filesmanager.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end" style={{ margin: 0 }}>
        <Logout/>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
