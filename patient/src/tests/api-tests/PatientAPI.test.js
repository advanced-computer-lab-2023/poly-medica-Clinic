import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	ERROR_STATUS_CODE,
} from '../../utils/Constants.js';

import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';

import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';
import { faker } from '@faker-js/faker';

describe('GET /address/:pateintId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient addresses correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.deliveryAddresses.length).toBe(
			patient.deliveryAddresses.length
		);
	});

	it('should return 404 NOT FOUND when the patient addresses are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({ message: 'addresses not found' });
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /address/:pateintId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the patient addresses correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const deliveryAddresses = generatePatient().deliveryAddresses;
		const id = patient._id.toString();
		const res = await request(app)
			.patch(`/address/${id}`)
			.send({ deliveryAddresses });
		const data = res._body.deliveryAddresses.map((address) => {
			delete address._id;
			return address;
		});
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(data).toEqual(deliveryAddresses);
	});

	it('should return 404 NOT FOUND when the patient addresses are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const deliveryAddresses = generatePatient().deliveryAddresses;
		const res = await request(app)
			.patch(`/address/${id}`)
			.send(deliveryAddresses);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({ message: 'addresses not found' });
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/address/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
