// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
	IconTypography,
	IconPalette,
	IconShadow,
	IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
	id: 'utilities',
	title: 'Utilities',
	type: 'group',
	children: [
		{
			id: 'util-typography',
			title: 'Typography',
			type: 'item',
			url: '/admin/utils/util-typography',
			icon: icons.IconTypography,
			breadcrumbs: false
		},
		{
			id: 'util-color',
			title: 'Color',
			type: 'item',
			url: '/admin/utils/util-color',
			icon: icons.IconPalette,
			breadcrumbs: false
		},
		{
			id: 'util-shadow',
			title: 'Shadow',
			type: 'item',
			url: '/admin/utils/util-shadow',
			icon: icons.IconShadow,
			breadcrumbs: false
		}
	]
};

export default utilities;
