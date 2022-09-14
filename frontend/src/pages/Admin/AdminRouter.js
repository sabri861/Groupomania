import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ALayout, Acceuil } from '../../pages/Admin'
import { User, UEdit, Add } from '../../pages/Admin/User'
import { Cocktail, CEdit } from '../../pages/Admin/Cocktail'

import Error from '../../_utils/error'
import { CreatePublication } from './Publication'
import { Profile } from './Profil'
import SideMenu from '../../components/admin/SideMenu'

const AdminRouter = ({ accountService }) => {
  return (
    <Routes>
      <Route element={<ALayout accountService={accountService} />}>
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
