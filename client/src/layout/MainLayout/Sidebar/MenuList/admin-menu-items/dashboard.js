// assets
import { IconDashboard } from '@tabler/icons';
import HomeIcon from '@mui/icons-material/Home';

// constant
const icons = { IconDashboard, HomeIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
	id: 'dashboard',
	title: 'Dashboard',
	type: 'group',
	children: [
		{
			id: 'default',
			title: 'Dashboard',
			type: 'item',
			url: '/admin/dashboard/default',
			icon: icons.IconDashboard,
			breadcrumbs: false
		},
		{
			id: 'home',
			title: 'Home',
			type: 'item',
			url: '/admin/dashboard/home',
			icon: icons.HomeIcon,
			breadcrumbs: false
		}
	]
};

export default dashboard;
