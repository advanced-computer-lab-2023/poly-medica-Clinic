import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { ADMIN_TYPE_ENUM } from 'utils/Constants';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyAdmins = Loadable(lazy(() => import('pages/admin/Admins')));
const LazyPatients = Loadable(lazy(() => import('pages/patient/Patients')));
const LazyDoctors = Loadable(lazy(() => import('pages/adminDoctors/Doctors')));
const LazyDoctorRequests = Loadable(lazy(() => import('pages/adminDoctors/DoctorRequests')));
const Account = Loadable(lazy(() => import('pages/profile/Account')));
const LazyPackages = Loadable(
	lazy(() => import('pages/HealthPackages/HealthPackage')),
);
const LazyHome = Loadable(lazy(() => import('pages/Home/Home')));

// utilities routing
const UtilsTypography = Loadable(
	lazy(() => import('pages/utilities/Typography')),
);

const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
	path: '/admin',
	element: <MainLayout userType={ADMIN_TYPE_ENUM} />,
	children: [
		{
			path: 'patient',
			element: <DashboardDefault />,
		},
		{
			path: 'dashboard',
			children: [
				{
					path: 'default',
					element: <DashboardDefault />,
				},
				{
					path: 'home',
					element: <LazyHome />,
				},
			],
		},
		{
			path: 'pages',
			children: [
				{
					path: 'profile',
					element: <Account />,
				},
				{
					path: 'admins',
					element: <LazyAdmins />,
				},
				{
					path: 'patients',
					element: <LazyPatients />,
				},
				{
					path: 'doctors',
					element: <LazyDoctors />,
				},
				{
					path: 'doctor-requests',
					element: <LazyDoctorRequests />,
				},
				{
					path: 'packages',
					element: <LazyPackages />,
				},
			],
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
			element: <SamplePage />,
		},
	],
};

export default AdminRoutes;
