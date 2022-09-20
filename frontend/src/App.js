// import logo from '@/logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRouter from './router/AdminRouter'
import AuthRouter from './router/AuthRouter'
import AuthGard from './_helpers/AuthGard'
import { CreatePublication } from '../src/pages/Admin/Publication'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AuthGard>
              <AdminRouter />
            </AuthGard>
          }
        />

        <Route
          path="/publication/*"
          element={
            <AuthGard>
              <CreatePublication />
            </AuthGard>
          }
        />

        <Route path="/*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
