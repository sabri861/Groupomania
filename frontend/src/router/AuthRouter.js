import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Error from '../_utils/error'
import Auth from '../pages/Auth/Auth'

const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<Auth />} />
      <Route path="auth" element={<Auth />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AuthRouter
