export const DUPLICATE_KEY_ERROR_CODE = 11000;

export const BAD_REQUEST_CODE_400 = 400;

export const OK_REQUEST_CODE_200 = 200;

export const PATIENT_ENUM = 'patient';

export const ACTIVE_USER_STATE = 'active';

export const GENDERS = ['MALE', 'FEMALE'];
export const OK_STATUS_CODE = 200;
export const NOT_FOUND_STATUS_CODE = 404;
export const ERROR_STATUS_CODE = 500;
export const EMPTY_SIZE = 0;
export const PORT = 8002;

export const MONGO_URI = 'mongodb://localhost:27017';
export const PATIENTS_BASE_URL = 'http://localhost:8002';
export const CLINIC_BASE_URL = 'http://localhost:8001';
export const AUTH_BASE_URL = 'http://localhost:8004';
export const FAMILIY_EMERGENCY = [
	'Parent',
	'Child',
	'Sibling',
	'Spouse',
	'Grandparent',
	'Grandchild',
	'Aunt',
	'Uncle',
	'Niece',
	'Nephew',
	'Cousin',
	'Other',
];

export const FAMILY_RELATIONS = ['HUSBAND', 'WIFE', 'CHILD'];

export const CREATED_STATUS_CODE = 201;
export const UNAUTHORIZED_STATUS_CODE = 401;
export const FAMILY_MEMBERS_PROJECTION = 'familyMembers';
export const PATIENT_PROJECTION = '-password';
export const PATIENT_FOLDER_NAME = 'patients';
export const HEALTH_PACKAGE_STATUS = ['CANCELLED', 'SUBSCRIBED WITH RENEWAL DATE', 'UNSUBSCRIBED'];
export const ZERO_INDEX = 0;