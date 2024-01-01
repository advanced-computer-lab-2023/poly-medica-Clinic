// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import patientMenuItem from 'layout/MainLayout/Sidebar/MenuList/patient-menu-items';
import doctortMenuItem from 'layout/MainLayout/Sidebar/MenuList/doctor-menu-items';
import admintMenuItem from 'layout/MainLayout/Sidebar/MenuList/admin-menu-items';
import { ADMIN_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';
import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
	const { user } = useSelector(state => state.user);
	const menuItem = user.type == PATIENT_TYPE_ENUM? patientMenuItem: user.type == ADMIN_TYPE_ENUM? admintMenuItem: doctortMenuItem;
	
	const navItems = menuItem.items.map((item) => {
		switch (item.type) {
		case 'group':
			return <NavGroup key={item.id} item={item} />;
		default:
			return (
				<Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
				</Typography>
			);
		}
	});

	return <>{navItems}</>;
};

export default MenuList;
