export const CLINIC_BASE_URL = 'http://localhost:8001';
export const PATIENT_BASE_URL = 'http://localhost:8002';
export const PHARMACY_BASE_URL = 'http://localhost:8003';
const APPOINTMENT_STATUS = ['COMPLETE', 'UNCOMPLETE', 'CANCELED'];
export const DATE_FILTER_ARRAY = ['Last week', 'Last month', 'Last year'];

export const APPOINTMENT_FILTER_ARRAY = [{
    attribute: 'Appointment Status',
    values: APPOINTMENT_STATUS
},
{
    attribute: 'Date',
    values: DATE_FILTER_ARRAY
}
];
