import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { ADMIN_TYPE_ENUM } from 'utils/Constants';
import AdminProvider from '../contexts/AdminContext';
import DoctorProvider from '../contexts/DoctorContext';
import PatientProvider from '../contexts/PatientContext';
// dashboard routing
const LazyAdmins = Loadable(lazy(() => import('pages/admin/admin-control/Admins')));
const LazyPatients = Loadable(lazy(() => import('pages/admin/admin-patients/Patients')));
const LazyDoctors = Loadable(lazy(() => import('pages/admin/admin-doctors/Doctors')));
const LazyDoctorRequests = Loadable(lazy(() => import('pages/admin/admin-doctors/DoctorRequests')));
const Account = Loadable(lazy(() => import('pages/profile/Account')));
const LazyPackages = Loadable(
	lazy(() => import('pages/health-packages/HealthPackage')),
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
			path: 'dashboard',
			children: [
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
					element:
						<AdminProvider>
							<LazyAdmins />
						</AdminProvider>,
				},
				{
					path: 'patients',
					element:
						<PatientProvider>
							<LazyPatients />
						</PatientProvider>
					,
				},
				{
					path: 'doctors',
					element:
						<DoctorProvider>
							<LazyDoctors />
						</DoctorProvider>,
				},
				{
					path: 'doctor-requests',
					element: <LazyDoctorRequests />,
				},
				{
					path: 'packages',
					element:
						<AdminProvider>
							<PatientProvider>
								<LazyPackages />
							</PatientProvider>
						</AdminProvider>
					,
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
