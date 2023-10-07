// assets
import { IconKey, IconVaccineBottle } from '@tabler/icons';

// constant
const icons = {
	IconKey,
	IconVaccineBottle
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
	id: 'pages',
	title: 'Pages',
	caption: 'Pages Caption',
	type: 'group',
	children: [
		{
			id: 'authentication',
			title: 'page',
			type: 'collapse',
			icon: icons.IconKey,

			children: [
				{
					id: 'login3',
					title: 'subPage',
					type: 'item',
					url: '/pages/login/login3',
					target: true
				},
				{
					id: 'register3',
					title: 'subPage',
					type: 'item',
					url: '/pages/register/register3',
					target: true
				}
			]
		},
		{
			id: 'medicines',
			title: 'Medicines',
			type: 'item', 
			icon: icons.IconVaccineBottle, 
			url: '/pages/medicines', 
			target: false 
		}
	]
};

export default pages;
