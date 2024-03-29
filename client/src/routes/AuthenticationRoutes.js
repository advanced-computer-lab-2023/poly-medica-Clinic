import AuthRoutesWrapper from 'pages/authentication/AuthRoutesWrapper';
import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('pages/authentication/authentication3/Register3')));
const ForgetPassword = Loadable(lazy(() => import('pages/authentication/authentication3/ForgetPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
	path: '/login',
	element:<AuthRoutesWrapper />,
	children: [
		{
			path: '/login/login3',
			element: <AuthLogin3 />
		},
		{
			path: '/login/register/register3',
			element: <AuthRegister3 />
		},
		{
			path: '/login/reset-password',
			element: <ForgetPassword />
		},
	]
};

export default AuthenticationRoutes;
