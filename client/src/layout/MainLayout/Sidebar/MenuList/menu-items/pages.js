// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconStethoscope,
    IconPrescription
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
// constant
const icons = {
    IconKey,
    IconVaccineBottle,
    AdminPanelSettingsOutlinedIcon,
    IconEmergencyBed,
    IconStethoscope,
    MedicationIcon,
    FamilyRestroomIcon,
    IconPrescription
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
            id: 'family-members',
            title: 'Family Members',
            type: 'item',
            icon: icons.FamilyRestroomIcon,
            url: '/pages/family-members',
            target: false,
        },
        {
			id: 'appointments',
			title: 'Appointments',
			type: 'item',
			icon: icons.TodayIcon,
			url: '/pages/appointments',
			target: false,
		},

		{
			id: 'prescriptions',
			title: 'Prescriptions',
			type: 'item',
			icon: icons.IconPrescription,
			url: '/pages/prescriptions',
			target: false
		},
        {
			id: 'Packages',
			title: 'Health Packages',
			type: 'item',
			icon: icons.SubscriptionsIcon,
			url: '/pages/packages',
			target: false
		},
        {
            id: 'clinic',
            title: 'Clinic',
            type: 'collapse',
            icon: icons.MedicationIcon,
            children: [
                {
                    id: 'doctors',
                    title: 'Doctors',
                    type: 'item',
                    icon: icons.IconStethoscope,
                    url: '/pages/clinic/doctors',
                    target: false,
                },
            ],
        },
	]
};

export default pages;
