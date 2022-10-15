import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../screens/auth/Login';
import Products from '../screens/dashboard/Products';
import ShowLeads from '../screens/leads/ShowLeads';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PublicRoute><AdminLogin /></PublicRoute>} />
            <Route path='/dashboard'>
              <Route path="" element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="leads" element={<PrivateRoute><ShowLeads /></PrivateRoute>} />
            </Route>
            <Route path='*' element={<div><p>Page not found</p></div>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing