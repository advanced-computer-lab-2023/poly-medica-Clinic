import request from 'supertest';
import server from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import { OK_STATUS_CODE, ERROR_STATUS_CODE, TIME_OUT } from '../../utils/Constants.js';
import MessageModel from '../../database/models/Message.js';
import generateMessage from '../model-generators/generateMessage.js';

import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

jest.setTimeout(TIME_OUT);
describe('GET /message/:chatId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve message correctly', async () => {
		const message = new MessageModel(generateMessage());
		await message.save();

		const res = await request(server).get(`/message/${message.chatId}`);
		expect(res.status).toBe(OK_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /message', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and add the message correctly', async () => {
		const message = generateMessage();
		const res = await request(server).post('/message').send({ message });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.chatId.toString()).toBe(message.chatId.toString());
	});

	it('should return 500 ERROR when the chat id is invalid', async () => {
		const id = faker.lorem.word();
		const message = generateMessage();
		message.chatId = id;
		const res = await request(server).post('/message').send({ message });
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});