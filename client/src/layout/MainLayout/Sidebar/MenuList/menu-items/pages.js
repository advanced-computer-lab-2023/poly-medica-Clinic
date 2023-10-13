// assets
import {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconStethoscope,
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

// constant
const icons = {
	IconKey,
	IconVaccineBottle,
	AdminPanelSettingsOutlinedIcon,
	IconEmergencyBed,
	IconStethoscope,
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
					target: true,
				},
				{
					id: 'register3',
					title: 'subPage',
					type: 'item',
					url: '/pages/register/register3',
					target: true,
				},
			],
		},
		{
			id: 'medicines',
			title: 'Medicines',
			type: 'item',
			icon: icons.IconVaccineBottle,
			url: '/pages/medicines',
			target: false,
		},
		{
			id: 'admins',
			title: 'Admins',
			type: 'item',
			icon: icons.AdminPanelSettingsOutlinedIcon,
			url: '/pages/admins',
			target: false,
		},
		{
			id: 'patients',
			title: 'Patients',
			type: 'item',
			icon: icons.IconEmergencyBed,
			url: '/pages/patients',
			target: false,
		},
		{
			id: 'doctors',
			title: 'Doctors',
			type: 'item',
			icon: icons.IconStethoscope,
			url: '/pages/doctors',
			target: false,
		},
		{
			id: 'ListOfPatients',
			title: 'ListOfPatientsRegiested',
			type: 'item',
			icon: icons.IconStethoscope,
			url: '/pages/listOfPatients',
			target: false,
		},
	],
};

export default pages;
