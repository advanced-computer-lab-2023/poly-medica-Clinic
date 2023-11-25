// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconStethoscope,
    IconRegistered,
    IconPrescription,
    IconCalendarTime
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
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
    IconCalendarTime,
    AddBoxIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'family-members',
            title: 'Family Members',
            type: 'item',
            icon: icons.FamilyRestroomIcon,
            url: '/patient/pages/family-members',
            target: false,
        },
        {
            id: 'appointments',
            title: 'Appointments',
            type: 'item',
            icon: icons.IconCalendarTime,
            url: '/patient/pages/appointments',
            target: false,
        },

        {
            id: 'prescriptions',
            title: 'Prescriptions',
            type: 'item',
            icon: icons.IconPrescription,
            url: '/patient/pages/prescriptions',
            target: false,
        },
        {
            id: 'Packages',
            title: 'Health Packages',
            type: 'item',
            icon: icons.AddBoxIcon,
            url: '/patient/pages/packages',
            target: false,
        },

        {
            id: 'doctors',
            title: 'Doctors',
            type: 'item',
            icon: icons.IconStethoscope,
            url: '/patient/pages/doctors',
            target: false,
        },
        {
            id: 'Wallet',
            title: 'Wallet',
            type: 'item',
            icon: icons.Wallet,
            url: '/patient/wallet',
            target: false,
        }
    ],
};

export default pages;
