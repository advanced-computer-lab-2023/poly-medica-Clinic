import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyMedicines = Loadable(lazy(() => import('pages/Medicines')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('pages/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'pages',
      children: [
        {
          path: 'medicines',
          element: <LazyMedicines />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />,
        },
        {
          path: 'util-color',
          element: <UtilsColor />,
        },
        {
          path: 'util-shadow',
          element: <UtilsShadow />,
        },
      ],
    },

    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
