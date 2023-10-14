import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import FamilyMembers from 'pages/family-member/FamilyMembers.js';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyPrescriptions = Loadable(
	lazy(() => import('pages/prescriptions/Prescriptions')),
);
const LazyAdmins = Loadable(lazy(() => import('pages/Admins')));
const LazyPatients = Loadable(lazy(() => import('pages/Patients')));
const LazyDoctors = Loadable(lazy(() => import('pages/Doctors')));
const LazyDoctorRequests = Loadable(lazy(() => import('pages/DoctorRequests')));
const LazyPackages = Loadable(
	lazy(() => import('pages/HealthPackages/HealthPackage')),
);
const LazyClinicDoctors = Loadable(lazy(() => import('pages/Doctors/Doctors')));
const LazyAppointments = Loadable(
	lazy(() => import('pages/Appointment/Appointment')),
);

// utilities routing
const UtilsTypography = Loadable(
	lazy(() => import('pages/utilities/Typography')),
);
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
			element: <DashboardDefault />,
		},
		{
			path: 'dashboard',
			children: [
				{
					path: 'default',
					element: <DashboardDefault />,
				},
			],
		},
		{
			path: 'pages',
			children: [
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
					path: 'family-members',
					element: <FamilyMembers />,
				},
				{
					path: 'appointments',
					element: <LazyAppointments />,
				},
				{
					path: 'prescriptions',
					element: <LazyPrescriptions />,
				},
				{
					path: 'packages',
					element: <LazyPackages />,
				},
				{
					path: 'clinic',
					children: [
						{
							path: 'doctors',
							element: <LazyClinicDoctors />,
						},
					],
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

export default MainRoutes;
