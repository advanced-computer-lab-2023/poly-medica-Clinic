// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconStethoscope,
    IconRegistered,
    IconPrescription,
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// constant
const icons = {
    IconKey,
    IconVaccineBottle,
    AdminPanelSettingsOutlinedIcon,
    IconEmergencyBed,
    IconStethoscope,
    MedicationIcon,
    FamilyRestroomIcon,
    IconPrescription,
    IconRegistered,
    AccountBoxIcon,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'admins',
            title: 'Admins',
            type: 'item',
            icon: icons.AdminPanelSettingsOutlinedIcon,
            url: '/admin/pages/admins',
            target: false,
        },
        {
            id: 'patients',
            title: 'Patients',
            type: 'item',
            icon: icons.IconEmergencyBed,
            url: '/admin/pages/patients',
            target: false,
        },
        {
            id: 'doctors',
            title: 'Doctors',
            type: 'item',
            icon: icons.IconStethoscope,
            url: '/admin/pages/doctors',
            target: false,
        },
        {
            id: 'doctor-requests',
            title: 'Doctor Requests',
            type: 'item',
            icon: icons.IconRegistered,
            url: '/admin/pages/doctor-requests',
        },
        {
            id: 'Packages',
            title: 'Health Packages',
            type: 'item',
            icon: icons.SubscriptionsIcon,
            url: '/admin/pages/packages',
            target: false,
        },
    ],
};

export default pages;
