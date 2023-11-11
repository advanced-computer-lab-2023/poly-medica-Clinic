import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	SIXTY,
	ZERO_INDEX,
	ONE,
} from '../../utils/Constants.js';

import AdminModel from '../../database/models/Admin.js';
import generateAdmin from '../model-generators/generateAdmin.js';

import {
	describe,
	beforeEach,
	afterEach,
	expect,
	it,
	jest,
} from '@jest/globals';

import { faker } from '@faker-js/faker';

const SECONDS = 1000;
jest.setTimeout(SIXTY * SECONDS);

jest.mock('axios');

describe('GET /admins', () => {
	const getAdmins = async () => {
		const response = await request(app).get('/admins');
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 upon getting all admins', async () => {
		const admin = await AdminModel(generateAdmin()).save();
		const response = await getAdmins();

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.admins.length).toBe(ONE);
		expect(response.body.admins[ZERO_INDEX].userName).toBe(admin.userName);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /admins', () => {
	const addAdmin = async (admin) => {
		const response = await request(app).post('/admins').send(admin);
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when adding new admin', async () => {
		const admin = generateAdmin();
		const response = await addAdmin(admin);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.userName).toBe(admin.userName);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /admins/:id', () => {
	const deleteAdmin = async (id) => {
		const response = await request(app).delete(`/admins/${id}`);
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when deleting none main admin', async () => {
		const admin = generateAdmin();
		admin.mainAdmin = false;
		const id = faker.database.mongodbObjectId();
		admin._id = id;
		await AdminModel(admin).save();
		const response = await deleteAdmin(id);

		expect(response.status).toBe(OK_STATUS_CODE);
	});

	it('should return 500 when deleting main admin', async () => {
		const admin = generateAdmin();
		admin.mainAdmin = true;
		const id = faker.database.mongodbObjectId();
		admin._id = id;
		await AdminModel(admin).save();
		const response = await deleteAdmin(id);

		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when admin not found', async () => {
		const id = faker.database.mongodbObjectId();
		const response = await deleteAdmin(id);

		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 when deleting admin with invalid id', async () => {
		const id = faker.lorem.word();
		const response = await deleteAdmin(id);

		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
