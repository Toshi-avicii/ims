import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../screens/auth/Login';
import Products from '../screens/dashboard/Products';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PublicRoute><AdminLogin /></PublicRoute>} />
            <Route path='dashboard'>
              <Route path='products' element={<PrivateRoute><Products /></PrivateRoute>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing