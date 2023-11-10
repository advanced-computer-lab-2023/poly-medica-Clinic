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
            url: '/doctor/pages/admins',
            target: false,
        },
        {
            id: 'patients',
            title: 'Patients',
            type: 'item',
            icon: icons.IconEmergencyBed,
            url: '/doctor/pages/patients',
            target: false,
        },
        {
            id: 'doctors',
            title: 'Doctors',
            type: 'item',
            icon: icons.IconStethoscope,
            url: '/doctor/pages/doctors',
            target: false,
        },
        {
            id: 'doctor-requests',
            title: 'Doctor Requests',
            type: 'item',
            icon: icons.IconRegistered,
            url: '/doctor/pages/doctor-requests',
        },
        {
            id: 'family-members',
            title: 'Family Members',
            type: 'item',
            icon: icons.FamilyRestroomIcon,
            url: '/doctor/pages/family-members',
            target: false,
        },
        {
            id: 'appointments',
            title: 'Appointments',
            type: 'item',
            icon: icons.TodayIcon,
            url: '/doctor/pages/appointments',
            target: false,
        },

        {
            id: 'prescriptions',
            title: 'Prescriptions',
            type: 'item',
            icon: icons.IconPrescription,
            url: '/doctor/pages/prescriptions',
            target: false,
        },
        {
            id: 'Packages',
            title: 'Health Packages',
            type: 'item',
            icon: icons.SubscriptionsIcon,
            url: '/doctor/pages/packages',
            target: false,
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
                    url: '/doctor/pages/clinic/doctors',
                    target: false,
                },
            ],
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
            id:'add-available-slots',
            title:'Add Available Slots',
            type:'item',
            icon:icons.IconStethoscope,
            url:'/doctor/pages/add-available-slots',
            target:false,
        },
        {
            id: 'Contract',
            title: 'Contract',
            type: 'item',
            icon: icons.IconKey,
            url: '/doctor/pages/contract',
            target: false,
        }
    ],
};

export default pages;
