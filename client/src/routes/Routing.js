import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../screens/auth/Login';
import Products from '../screens/dashboard/Products';
import ShowLeads from '../screens/leads/ShowLeads';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LeadForm from '../screens/leads/LeadForm';
import ShowCounselors  from '../screens/counselors/ShowCounselors';
import Profile from '../screens/Profile/Profile';
import CounselorForm from '../screens/counselors/CounselorForm';
import ShowTrash from '../screens/trash/ShowTrash';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PublicRoute><AdminLogin /></PublicRoute>} />
            <Route path='/dashboard'>
              <Route path="" element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="leads/create-new-lead" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
              <Route path="leads/pages/:page" element={<PrivateRoute><ShowLeads /></PrivateRoute>} />
              <Route path="leads/trash/pages/:page" element={<PrivateRoute><ShowTrash /></PrivateRoute>} />
              <Route path='counselors/pages/:page' element={<PrivateRoute><ShowCounselors /></PrivateRoute>} />
              <Route path="counselors/create-new-counselor" element={<PrivateRoute><CounselorForm /></PrivateRoute>} />
            </Route>
            <Route path='*' element={<div><p>Page not found</p></div>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing