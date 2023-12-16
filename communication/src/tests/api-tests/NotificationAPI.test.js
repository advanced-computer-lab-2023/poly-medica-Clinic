import request from 'supertest';
import app from '../../../app.js';
import { 
	connectDBTest,
	disconnectDBTest
} from '../../utils/testing-utils.js';
import Notification from '../../database/models/Notification.js';
import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';
import generateNotification from '../model-generators/generateNotification.js';
import { faker } from '@faker-js/faker';
import { 
	BAD_REQUEST_CODE,
	NORMAL_NOTIFICATION_TYPE_ENUM,
	NOTIFICATION_BODY_REQUIRE_MESSAGE,
	NOTIFICATION_HEAD_REQUIRE_MESSAGE,
	NOTIFICATION_SENDER_NAME_REQUIRE_MESSAGE,
	OK_STATUS_CODE,
	ZERO,
	ONE,
	TWO
} from '../../utils/Constants.js';

describe('GET /notifications/:userId', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	}); 

	it('should return 200 OK when getting all notifications of the user', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		const userNotification = await Notification.findOne();
		const notification = generateNotification();
		notification.notificationType = NORMAL_NOTIFICATION_TYPE_ENUM;
		userNotification.notifications.push(notification);
		await userNotification.save();
		const res = await request(app).get(`/notifications/${userId}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.length).toBe(ONE);
		expect(res._body[ZERO].notificationHead).toBe(notification.notificationHead);
		expect(res._body[ZERO].notificationBody).toBe(notification.notificationBody);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});


describe('POST /user/:id', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	}); 

	it('should return 200 OK when posting a user', async () => {
		const userId = faker.database.mongodbObjectId();
		const res = await request(app).post(`/user/${userId}`);
		expect(res.status).toBe(OK_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /notification/:userId/type/:type', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	}); 

	it('should return 200 OK when posting a normal notification', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		const notification = generateNotification();
		const res = await request(app).post(`/notification/${userId}/type/${NORMAL_NOTIFICATION_TYPE_ENUM}`).send(notification);
		expect(res.status).toBe(OK_STATUS_CODE);
	});

	it('should return 400 bad request when posting a normal notification without the notification head', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		const notification = generateNotification();
		delete notification.notificationHead;
		const res = await request(app).post(`/notification/${userId}/type/${NORMAL_NOTIFICATION_TYPE_ENUM}`).send(notification);
		expect(res.status).toBe(BAD_REQUEST_CODE);
		expect(JSON.parse(res.text).errMessage).toBe(`${NOTIFICATION_HEAD_REQUIRE_MESSAGE}\n`);
        
	});

	it('should return 400 bad request when posting a normal notification without the notification head and body', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		const notification = {};
		const res = await request(app).post(`/notification/${userId}/type/${NORMAL_NOTIFICATION_TYPE_ENUM}`).send(notification);
		expect(res.status).toBe(BAD_REQUEST_CODE);
		expect(JSON.parse(res.text).errMessage).toBe(`${NOTIFICATION_BODY_REQUIRE_MESSAGE}\n${NOTIFICATION_HEAD_REQUIRE_MESSAGE}\n`);
        
	});

	it('should return 400 bad request when posting a notification without a type', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		const notification = generateNotification();
		const res = await request(app).post(`/notification/${userId}/type/${null}`).send(notification);
		expect(res.status).toBe(BAD_REQUEST_CODE);
		expect(JSON.parse(res.text).errMessage).toBe(`${NOTIFICATION_SENDER_NAME_REQUIRE_MESSAGE}\n`);
        
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /user/:id', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	}); 

	it('should return 200 OK when deleting a user', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		const res = await request(app).delete(`/user/${userId}`);
		const userNotification = await Notification.find();
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(userNotification.length).toBe(ZERO);
	});

	it('should return 200 OK when not deleting any user', async () => {
		const userId1 = faker.database.mongodbObjectId();
		const userId2 = faker.database.mongodbObjectId();
		await Notification.create({ userId:userId1 });
		const res = await request(app).delete(`/user/${userId2}`);
		const userNotification = await Notification.find();
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(userNotification.length).toBe(ONE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /notification/:userId/:notificationId', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	}); 

	it('should return 200 OK when updating the notificaion from unseen to seen', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		let userNotification = await Notification.findOne();
		const notification = generateNotification();
		notification.notificationType = NORMAL_NOTIFICATION_TYPE_ENUM;
		userNotification.notifications.push(notification);
		userNotification = await userNotification.save();
		const notificationId = userNotification.notifications[ZERO]._id;
		const res = await request(app).patch(`/notification/${userId}/${notificationId}`);
		const { notifications } = await Notification.findOne({ userId },'notifications');
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(notifications[ZERO].notificationState).toBe(true);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});


describe('PATCH /notifications/:userId', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	}); 

	it('should return 200 OK when updating all the notificaions from unseen to seen', async () => {
		const userId = faker.database.mongodbObjectId();
		await Notification.create({ userId });
		const userNotification = await Notification.findOne();
		const notification1 = generateNotification();
		notification1.notificationType = NORMAL_NOTIFICATION_TYPE_ENUM;
		userNotification.notifications.push(notification1);
		const notification2 = generateNotification();
		notification2.notificationType = NORMAL_NOTIFICATION_TYPE_ENUM;
		userNotification.notifications.push(notification2);
		await userNotification.save();
		const res = await request(app).patch(`/notifications/${userId}`);
		const { notifications } = await Notification.findOne({ userId },'notifications');
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(notifications.length).toBe(TWO);
		notifications.forEach(notification => {
			expect(notification.notificationState).toBe(true);    
		});
        
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});