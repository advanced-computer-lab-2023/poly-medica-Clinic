// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconStethoscope,
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
// constant
const icons = {
    IconKey,
    IconVaccineBottle,
    AdminPanelSettingsOutlinedIcon,
    IconEmergencyBed,
    IconStethoscope,
    MedicationIcon,
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
            type: 'collapse',
            icon: icons.AdminPanelSettingsOutlinedIcon,
            children: [
                {
                    id: 'admins',
                    title: 'Admins',
                    type: 'item',
                    icon: icons.AdminPanelSettingsOutlinedIcon,
                    url: '/pages/admins/admins',
                    target: false,
                },
                {
                    id: 'patients',
                    title: 'Patients',
                    type: 'item',
                    icon: icons.IconEmergencyBed,
                    url: '/pages/admins/patients',
                    target: false,
                },
                {
                    id: 'doctors',
                    title: 'Doctors',
                    type: 'item',
                    icon: icons.IconStethoscope,
                    url: '/pages/admins/doctors',
                    target: false,
                },
            ],
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
    ],
};

export default pages;
