import { useRoutes } from 'react-router-dom';

// routes
import PatientRoutes from './PatientRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import DoctorRoutes from './DoctorRoutes';
import AdminRoutes from './AdminRoutes';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes([PatientRoutes, DoctorRoutes, AdminRoutes, AuthenticationRoutes]);
}
