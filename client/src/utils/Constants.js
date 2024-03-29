export const CLINIC_BASE_URL = 'http://localhost:8001';
export const PATIENT_BASE_URL = 'http://localhost:8002';
export const PHARMACY_BASE_URL = 'http://localhost:8003';
export const COMMUNICATION_BASE_URL = 'http://localhost:8006';
export const FAMILY_BOOKING_TYPE = 'family';
export const MY_SELF_BOOKING_TYPE = 'myself';
export const PHARMACY_MONGO_ID = '5fc7a921328d333b8ce85141';

const APPOINTMENT_STATUS = [
    'COMPLETE',
    'INCOMPLETE',
    'CANCELLED',
    'RESCHEDULED',
];
const APPOINTMENT_CHRONOLGY = ['UPCOMING', 'PAST'];
export const APPOINTMENT_NOTIFICATION_TYPE_ENUM = 'appointment';
export const DATE_FILTER_ARRAY = ['Last week', 'Last month', 'Last year'];

export const APPOINTMENT_FILTER_ARRAY = [
    {
        attribute: 'Appointment Status',
        values: APPOINTMENT_STATUS,
    },
    {
        attribute: 'Date',
        values: DATE_FILTER_ARRAY,
    },
    {
        attribute: 'Chronology',
        values: APPOINTMENT_CHRONOLGY,
    },
];

export const PATIENT_TYPE_ENUM = 'patient';

export const DOCTOR_TYPE_ENUM = 'doctor';

export const ADMIN_TYPE_ENUM = 'admin';

export const PHARMACIST_TYPE_ENUM = 'pharmacist';

export const HEALTH_PACKAGE_STATUS = [
    'CANCELLED',
    'SUBSCRIBED WITH RENEWAL DATE',
    'UNSUBSCRIBED',
];

export const OK_STATUS_CODE = 200;
export const PUBLIC_KEY =
    'pk_test_51O42p1LtBZHl10napsQI3fM0sBwi0QLCZJc7k8wpLLfbGVnpf8QcQvBUkNiNVL6TGkqMzL5bADebhcTdZhKDNiqv00ESfjq69z';
export const ADDRESS_ATTRIBUTES = [
    'city',
    'street',
    'buildingName',
    'phoneNumber',
];

export const PENDING_STATUS = 'pending';
export const CANCELLED_STATUS = 'cancelled';

export const DATE_FORAMT = 'MMMM Do YYYY, h:mm a';

export const ZERO_INDEX = 0;

export const PAYMENT_ITEM_TYPES = ['Health-Package', 'appointment'];

export const LIMIT_PER_PAGE = 5;

export const TWO_SECONDS = 2000;

export const GENDERS = ['MALE', 'FEMALE'];

export const RELATIONS = ['HUSBAND', 'WIFE', 'CHILD'];

export const REGISTERED_MEMBER = 'Registered-Family-Member';

export const UNREGISTERED_MEMBER = 'Unregistered-Family-Member';