import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { PATIENT_TYPE_ENUM } from 'utils/Constants';

// dashboard routing
const LazyPrescriptions = Loadable(
	lazy(() => import('pages/prescriptions/Prescriptions')),
);
const LazyPackages = Loadable(
	lazy(() => import('pages/health-packages/HealthPackage')),
);
import DoctorProvider from 'contexts/DoctorContext';
import PatientProvider from 'contexts/PatientContext';
import AdminProvider from 'contexts/AdminContext';
import Page_404 from 'pages/Page_404';
const LazyClinicDoctors = Loadable(lazy(() => import('pages/patient/patient-doctors/Doctors')));
const LazyAppointments = Loadable(
	lazy(() => import('pages/Appointment/Appointment')),
);
const LazyFollowUpRequests = Loadable(
	lazy(() => import('pages/follow-up-requests/FollowUpRequests')),
);
const LazyPayment = Loadable(lazy(() => import('pages/payment/Payment')));
const LazyAccount = Loadable(lazy(() => import('pages/profile/Account'))); //TODO: generalize this

const LazyFamilyMembers = Loadable(lazy(() => import('pages/patient/family-members/FamilyMembers.js')));
const LazyVideoChat = Loadable(lazy(() => import('pages/chat/VideoChat.js')));
const LazyChat = Loadable(lazy(() => import('pages/chat/Chat')));
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

const MainRoutes = {
	path: '/patient',
	element: <MainLayout userType={PATIENT_TYPE_ENUM} />,
	children: [
		{
			path: 'dashboard',
			children: [
				{
					path: 'home',
					element: <LazyHome />,
				}
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
					element:
						<PatientProvider>
							<LazyFamilyMembers />
						</PatientProvider>
					,
				},
				{
					path: 'appointments',
					element: <LazyAppointments />,
				},
				{
					path: 'follow-up-requests',
					element: <LazyFollowUpRequests />,
				},
				{
					path: 'prescriptions',
					element: <LazyPrescriptions />,
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
				{
					path: 'payment',
					element: <LazyPayment />,
				},
				{
					path: 'doctors',
					element:
						<PatientProvider>
							<DoctorProvider>
								<LazyClinicDoctors />
							</DoctorProvider>
						</PatientProvider>
					,
				},
				{
					path: 'chat',
					element: <LazyChat />,
				},
				{
					path: 'video-chat/:idToCall',
					element: <LazyVideoChat />
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
			path: '*',	
			element: <Page_404/>,
		}
	],
};

export default MainRoutes;
