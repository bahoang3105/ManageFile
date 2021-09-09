import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader,
} from './index'

const TheLayoutAdmin = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader avt='/avatars/6.jpg'/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayoutAdmin
