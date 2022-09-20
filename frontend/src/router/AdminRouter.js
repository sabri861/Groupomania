import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppContainer } from '../router'
import { Acceuil } from '../pages/Admin/dashbord'
import Error from '../_utils/error'
import { CreatePublication } from '../pages/Admin/Publication'
import { Profile } from '../pages/Admin/Profil'

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<AppContainer />}>
        <Route index element={<Acceuil />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/createPublication" element={<CreatePublication />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default AdminRouter
