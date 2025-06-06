import { Routes, Route } from 'react-router-dom';
import AuthListener from '../services/AuthListener';
import AuthRedirect from './AuthRedirect';
import AdminRoute from './AdminRoute';

import AdminLogin from '../pages/admin/Login';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Universities from '../pages/admin/universities/Universities';
import Faculties from '../pages/admin/faculties/Faculties';
import Semesters from '../pages/admin/semesters/Semesters';
import Professors from '../pages/admin/professors/Professors';
import Users from '../pages/admin/users/Users';

const Home = () => <div>Home</div>;

function AppRoutes() {
  return (
    <>
      <AuthListener />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/admin/login"
          element={
            /* Redirect to /admin/dashboard if logged in */
            <AuthRedirect redirectTo="/admin/dashboard">
              <AdminLogin />
            </AuthRedirect>
          }
        />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="universities" element={<Universities />} />
            <Route path="faculties" element={<Faculties />} />
            <Route path="semesters" element={<Semesters />} />
            <Route path="professors" element={<Professors />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
