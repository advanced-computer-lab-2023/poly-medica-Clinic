import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { DOCTOR_TYPE_ENUM } from 'utils/Constants';
import DoctorProvider from 'contexts/DoctorContext';
import PatientProvider from 'contexts/PatientContext';

// dashboard routing
const LazyDoctorListofPatients = Loadable(
    lazy(() => import('pages/doctor/doctor-patients/DoctorListofPatients'))
);
const LazyAppointments = Loadable(
    lazy(() => import('pages/Appointment/Appointment'))
);
const LazyFollowUpRequests = Loadable(
    lazy(() => import('pages/follow-up-requests/FollowUpRequests')),
);
const LazyAddAvailableSlots = Loadable(
    lazy(() => import('pages/doctor/available-slots/AddAvailableSlots'))
);

const LazyPrescriptions = Loadable(
    lazy(() => import('pages/prescriptions/Prescriptions'))
);


const LazyChat = Loadable(lazy(() => import('pages/chat/Chat')));
const LazyHome = Loadable(lazy(() => import('pages/Home/Home')));

const Account = Loadable(lazy(() => import('pages/profile/Account')));
const LazyVideoChat = Loadable(lazy(() => import('pages/chat/VideoChat.js')));


// utilities routing
const UtilsTypography = Loadable(
    lazy(() => import('pages/utilities/Typography'))
);
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const DoctorRoutes = {
    path: '/doctor',
    element: <MainLayout userType={DOCTOR_TYPE_ENUM} />,
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
                    element: <Account />,
                },
                {
                    path: 'profile/:patientId',
                    element: <Account />,
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
                    path: 'my-patients',
                    element:
                        <DoctorProvider>
                            <PatientProvider>
                                <LazyDoctorListofPatients />
                            </PatientProvider>
                        </DoctorProvider>
                    ,
                },
                {
                    path: 'add-available-slots',
                    element:
                        <DoctorProvider>
                            <LazyAddAvailableSlots />
                        </DoctorProvider>
                    ,
                },

                {
                    path: 'chat',
                    element: <LazyChat />,
                },
                {
                    path: 'my-patients/:patientId/prescriptions',
                    element: <LazyPrescriptions />
                },
                {
                    path: 'video-chat/:idToCall',
                    element: <LazyVideoChat />
                },
                {
                    path: 'chat',
                    element: <LazyChat />,
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

export default DoctorRoutes;
