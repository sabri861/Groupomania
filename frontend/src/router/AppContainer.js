import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import AHeader from '../components/admin/AHeader'

const AppContainer = () => {
  useEffect(() => {
    // change root background color for overscroll
    document.documentElement.style.setProperty('background', 'white')
  }, [])

  return (
    <div className="AppContainer">
      <AHeader />
      <div id="admin">
        <div id="admin_body">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AppContainer
