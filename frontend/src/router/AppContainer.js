import React from 'react'
import { Outlet } from 'react-router-dom'

import AHeader from '../components/admin/AHeader'

const AppContainer = () => {
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
