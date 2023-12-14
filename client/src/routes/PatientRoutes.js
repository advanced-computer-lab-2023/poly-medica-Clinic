import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { PATIENT_TYPE_ENUM } from 'utils/Constants';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyPrescriptions = Loadable(
	lazy(() => import('pages/prescriptions/Prescriptions')),
);
const LazyPackages = Loadable(
	lazy(() => import('pages/HealthPackages/HealthPackage')),
);
const LazyWalletAmount = Loadable(
	lazy(() => import('pages/Wallet/WalletAmount')),
);

const LazyClinicDoctors = Loadable(lazy(() => import('pages/Doctors/Doctors')));
const LazyAppointments = Loadable(
	lazy(() => import('pages/Appointment/Appointment')),
);
const LazyPayment = Loadable(lazy(() => import('pages/payment/Payment')));
const LazyAccount = Loadable(lazy(() => import('pages/profile/Account'))); //TODO: generalize this

const LazyFamilyMembers = Loadable(lazy(() => import('pages/family-member/FamilyMembers.js')));

const LazyChat = Loadable(lazy(() => import('pages/chat/Chat')));

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
	path: '/patient',
	element: <MainLayout userType={PATIENT_TYPE_ENUM} />,
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
			],
		},
		{
			path: 'pages',
			children: [
				{
					path: 'profile',
					element: <LazyAccount />,
				},
				{
					path: 'family-members',
					element: <LazyFamilyMembers />,
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
					path: 'payment',
					element: <LazyPayment />,
				},
				{
					path: 'doctors',
					element: <LazyClinicDoctors />,
				},
				{
					path: 'chat',
					element: <LazyChat />,
				}
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
		{
			path: 'wallet',
			element: <LazyWalletAmount />,
		},
	],
};

export default MainRoutes;
