// assets
import { IconDashboard } from '@tabler/icons';
import HomeIcon from '@mui/icons-material/Home';

// constant
const icons = { IconDashboard, HomeIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
	id: 'dashboard',
	title: 'Home',
	type: 'group',
	children: [
		{
			id: 'home',
			title: 'Home',
			type: 'item',
			url: '/patient/dashboard/home',
			icon: icons.HomeIcon,
			breadcrumbs: false
		}
	]
};

export default dashboard;
