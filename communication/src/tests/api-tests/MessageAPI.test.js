import request from 'supertest';
import server from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import { OK_STATUS_CODE } from '../../utils/Constants.js';
import MessageModel from '../../database/models/Message.js';
import generateMessage from '../model-generators/generateMessage.js';

import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';


describe('GET /message/:chatId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve chat correctly', async () => {
		const message = new MessageModel(generateMessage());
		await message.save();

		const res = await request(server).get(`/message/${message.chatId}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		console.log('res._body', res._body);

	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});