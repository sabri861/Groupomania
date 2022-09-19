import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Error from '../_utils/error'
import Auth from '../pages/Auth/Auth'

const AuthRouter = ({ accountService }) => {
  return (
    <Routes>
      <Route index element={<Auth accountService={accountService} />} />
      <Route path="auth" element={<Auth accountService={accountService} />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AuthRouter
