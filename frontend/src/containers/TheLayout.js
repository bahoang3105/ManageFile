import React from 'react'
import {
  TheContent,
  TheFooter,
  TheHeader,
} from './index'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <TheHeader avt='/avatars/1.png'/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout;