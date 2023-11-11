import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	SIXTY,
} from '../../utils/Constants.js';

import DoctorReqModel from '../../database/models/DoctorReq.js';
import generateDoctorReq from '../model-generators/generateDoctorReq.js';

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


describe('GET /doctor-requests', () => {
	const getDoctorRequests = async () => {
		const response = await request(app).get('/doctor-requests');
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 upon getting all requests', async () => {
		const doctorReq = await DoctorReqModel(
			generateDoctorReq(),
		).save();
		const response = await getDoctorRequests();

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.doctorRequests.length).toBe(1);
		expect(response.body.doctorRequests[0].userName).toBe(
			doctorReq.userName,
		);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /add-doctor-req', () => {
	const addDoctorReq = async (doctorReq) => {
		const response = await request(app)
			.post('/add-doctor-req')
			.field('sendData', JSON.stringify(doctorReq));
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when adding new doctor request', async () => {
		const doctorReq = generateDoctorReq();

		const response = await addDoctorReq(doctorReq);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.userName).toBe(doctorReq.userData.userName);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /doctor-requests/:id?accept=x', () => {
	const deleteDoctorReq = async (id, accept) => {
		const response = await request(app).delete(
			`/doctor-requests/${id}?accept=${accept}`,
		);
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 upon deleting a doctor request when accepted', async () => {
		const doctorReq = await DoctorReqModel(
			generateDoctorReq(),
		).save();
		const response = await deleteDoctorReq(doctorReq._id, true);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.message).toBe('doctor request deleted');
	});

	it('should return 200 upon deleting a doctor request when rejected', async () => {
		const doctorReq = await DoctorReqModel(
			generateDoctorReq(),
		).save();
		const response = await deleteDoctorReq(doctorReq._id, false);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.message).toBe('doctor request deleted');
	});

	it('should return 404 upon deleting a doctor request that does not exist', async () => {
		const id = faker.database.mongodbObjectId();
		const response = await deleteDoctorReq(id, true);

		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.message).toBe('doctor request not found');
	});

	it('should return 500 upon deleting a doctor request with invalid id', async () => {
		const id = faker.lorem.word();
		const response = await deleteDoctorReq(id, true);

		expect(response.status).toBe(ERROR_STATUS_CODE);
		expect(response.body.message).toBe('Invalid ID');
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
