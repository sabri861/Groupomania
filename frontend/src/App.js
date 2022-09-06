// import logo from '@/logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRouter from './pages/Admin/AdminRouter';
import AuthRouter from './pages/Auth/AuthRouter';
import PublicRouter from './pages/Public/PublicRouter';
import AuthGard from './_helpers/AuthGard';



function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/*' element={<PublicRouter/>} />
        <Route path='/admin/*' element={
          <AuthGard>
        <AdminRouter/>
        </AuthGard>
        }/>
        <Route path='/auth/*' element={<AuthRouter/>} />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
