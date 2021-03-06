import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import Login from './pages/Login';
// import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Device from './pages/Device';
import DeviceDetail from './pages/DeviceDetail';

// ----------------------------------------------------------------------

export default function Router() {
  console.log('routes')
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'devices', element: <Device /> },
        { path: 'devices/:id', element: <DeviceDetail /> }
      ]
    },
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     // { path: 'login', element: <Login /> },
    //     { path: 'register', element: <Register /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '/', element: <Navigate to="/dashboard" /> }
    //   ]
    // }
  ]);
}