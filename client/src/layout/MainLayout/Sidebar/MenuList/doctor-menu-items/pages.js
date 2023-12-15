// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconStethoscope,
    IconRegistered,
    IconPrescription,
    IconCalendarTime,
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Wallet } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import RequestPageIcon from '@mui/icons-material/RequestPage';

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
    Wallet,
    ChatIcon,
    RequestPageIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'appointments',
            title: 'Appointments',
            type: 'item',
            icon: icons.IconCalendarTime,
            url: '/doctor/pages/appointments',
            target: false,
        },
        {
            id: 'follow-up-requests',
            title: 'Follow-Up Requests',
            type: 'item',
            icon: icons.RequestPageIcon,
            url: '/doctor/pages/follow-up-requests',
            target: false,
        },
        {
            id: 'ListOfPatients',
            title: 'My Patients',
            type: 'item',
            icon: icons.IconStethoscope,
            url: '/doctor/pages/my-patients',
            target: false,
        },
        {
            id: 'add-available-slots',
            title: 'Add Available Slots',
            type: 'item',
            icon: icons.IconStethoscope,
            url: '/doctor/pages/add-available-slots',
            target: false,
        },
        {
            id: 'Contract',
            title: 'Contract',
            type: 'item',
            icon: icons.IconKey,
            url: '/doctor/pages/contract',
            target: false,
        },
        {
            id: 'chat',
            title: 'Chat',
            type: 'item',
            icon: icons.ChatIcon,
            url: '/doctor/pages/chat',
            target: false,
        },
    ],
};

export default pages;
