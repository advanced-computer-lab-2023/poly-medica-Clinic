export const CLINIC_ADMIN_ENUM = 'clinic admin';

export const PHARMACY_ADMIN_ENUM = 'pharmacy admin';

export const ADMIN_FRONT_ENUM = 'admin';

export const PATIENT_ENUM = 'patient';

export const DOCTOR_ENUM = 'doctor';

export const PHARMACIST_ENUM = 'pharmacist';

export const CLINIC_REQ = 'clinic';

export const PHARMACY_REQ = 'pharmacy';

export const USER_ARR_ENUM = [CLINIC_ADMIN_ENUM, PHARMACY_ADMIN_ENUM, PATIENT_ENUM, DOCTOR_ENUM, PHARMACIST_ENUM];

export const DUPLICATE_KEY_ERROR_CODE = 11000;

export const ONE_DAY_MAX_AGE_IN_MIINUTS = 24 * 60 * 60;

export const ONE_DAY_MAX_AGE_IN_MILLEMIINUTS = 1000 * 24 * 60 * 60;

export const BAD_REQUEST_CODE_400 = 400;

export const SERVER_ERROR_REQUEST_CODE_500 = 500;

export const OK_REQUEST_CODE_200 = 200;

export const PATIENT_SIGNUP_URL = 'http://localhost:8002/signup';

export const ADMIN_Clinic_SIGNUP_URL = 'http://localhost:8001/admins';

export const ADMIN_Pharmacy_SIGNUP_URL = 'http://localhost:8003/admins';

export const DOCOTOR_SIGNUP_URL = 'http://localhost:8001/add-doctor-req';

export const DOCOTOR_CHECK_DOC_USERS = 'http://localhost:8001/check-doctor';

export const PHARMACIST_BASE_URL = 'http://localhost:8003/';

export const PHARMACIST_SIGNUP_URL = 'http://localhost:8003/add-pharmacist-req';

export const COMMUNICATION_USER_POST_URL = "http://localhost:8006/user"

export const DUB_EMAIL_ERROR_MESSAGE = 'that email is already registered';

export const DUB_USERNAME_ERROR_MESSAGE = 'that username is already registered';

export const INCORRECT_USER_ERROR_MESSAGE = 'incorrect userName'

export const INCORRECT_PASSWORD_ERROR_MESSAGE = 'incorrect Password'

export const PORT = 8004;
