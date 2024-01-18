import { useRoutes } from 'react-router-dom';

// routes
import PatientRoutes from './PatientRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import DoctorRoutes from './DoctorRoutes';
import AdminRoutes from './AdminRoutes';
import Page_404Routes from './Page_404Routes';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes([PatientRoutes, DoctorRoutes, AdminRoutes, AuthenticationRoutes, Page_404Routes]);
}
