// import logo from '@/logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRouter from './pages/Admin/AdminRouter'
import AuthRouter from './pages/Auth/AuthRouter'
import AuthGard from './_helpers/AuthGard'

function App({ accountService }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AuthGard accountService={accountService}>
              <AdminRouter accountService={accountService} />
            </AuthGard>
          }
        />
        <Route
          path="/*"
          element={<AuthRouter accountService={accountService} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
