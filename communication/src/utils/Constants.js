export const PORT = 8006;

export const ONE = 1;
export const ZERO = 0;
export const TWO = 2;

export const TIME_OUT = 30000;

export const OK_STATUS_CODE = 200;
export const NOT_FOUND_STATUS_CODE = 404;
export const ERROR_STATUS_CODE = 500;
export const BAD_REQUEST_CODE = 400;
export const DUPLICATE_KEY_ERROR_CODE = 11000;

export const SERVER_ERROR_MESSAGE = 'Server error';
export const DATABASE_INSERTION_ERROR_MESSAGE =
	'an error occurred while insert the notification';
export const DATABASE_UPDATE_ERROR_MESSAGE =
	'an error occurred while update the notification';
export const INVALID_NOTIFICATION_ERROR_MESSAGE = 'invalid notification type';
export const NOTIFICATION_HEAD_REQUIRE_MESSAGE =
	'notification head is required';
export const NOTIFICATION_BODY_REQUIRE_MESSAGE =
	'notification body is required';
export const NOTIFICATION_TYPE_REQUIRE_MESSAGE =
	'notification type is required';
export const NOTIFICATION_SENDER_NAME_REQUIRE_MESSAGE =
	'sender name is required';
export const NOTIFICATION_INVALID_TYPE_MESSAGE = 'invalid notification type';
export const DUB_USER_ID = 'dublicate user id';
export const ZERO_INDEX = 0;

export const NORMAL_NOTIFICATION_TYPE_ENUM = 'normal';
export const APPOINTMENT_NOTIFICATION_TYPE_ENUM = 'appointment';
export const MEDICINE_NOTIFICATION_TYPE_ENUM = 'medicine';
export const NOTIFICATION_TYPE_ENUM = [
	NORMAL_NOTIFICATION_TYPE_ENUM,
	APPOINTMENT_NOTIFICATION_TYPE_ENUM,
	MEDICINE_NOTIFICATION_TYPE_ENUM,
];
export const AUTH_BASE_URL = 'http://localhost:8004';
