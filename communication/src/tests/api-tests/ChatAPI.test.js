import request from 'supertest';
import server from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import { OK_STATUS_CODE, ERROR_STATUS_CODE, ZERO, TIME_OUT } from '../../utils/Constants.js';
import ChatModel from '../../database/models/Chat.js'; '../../database/models/Chat.js';
import generateChat from '../model-generators/generateChat.js';

import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

jest.setTimeout(TIME_OUT);
describe('GET /chat/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve chat correctly', async () => {
		const chat = new ChatModel(generateChat());
		await chat.save();

		const res = await request(server).get(`/chat/${chat.users[ZERO].id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body[ZERO].chatName).toBe(chat.chatName);
	});

	it('should return 500 Error when user id is invalid', async () => {
		const chat = new ChatModel(generateChat());
		await chat.save();
		const id = faker.lorem.word();
		const res = await request(server).get(`/chat/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /chat', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and add the chat correctly', async () => {
		const chat = generateChat();
		const res = await request(server).post('/chat').send({ chat });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.chatName).toBe(chat.chatName);
	});

	it('should return 500 ERROR when the user id is invalid', async () => {
		const id = faker.lorem.word();
		const chat = generateChat();
		chat.users[ZERO].id = id;
		const res = await request(server).post('/chat').send({ chat });
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /chat', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the chat last message correctly', async () => {
		const chat = new ChatModel(generateChat());
		await chat.save();
		chat.chatName = faker.lorem.words({ min: 1, max: 5 });
		const res = await request(server).patch('/chat').send({ chat });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.chatName).toBe(chat.chatName);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});