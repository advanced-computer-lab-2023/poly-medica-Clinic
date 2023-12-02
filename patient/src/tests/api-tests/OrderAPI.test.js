import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	ONE,
	ORDER_STATUS,
	TIME_OUT,
	ZERO_INDEX
} from '../../utils/Constants.js';

import OrderModel from '../../database/models/Order.js';
import PatientModel from '../../database/models/Patient.js';
import generateOrder from '../../tests/model-generators/generateOrder.js';
import generatePatient from '../../tests/model-generators/generatePatient.js';

import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

jest.setTimeout(TIME_OUT);
describe('GET /order/:patientId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient orders correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const len = faker.number.int({ min: 5, max: 10 });
		for (let i = 0; i < len; i++) {
			const order = new OrderModel(generateOrder(patient._id));
			await order.save();
		}
		const id = patient._id.toString();
		const res = await request(app).get(`/order/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.length).toBe(len);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/order/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /order', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and create a new order', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const order = new OrderModel(generateOrder(patient._id, ORDER_STATUS[ZERO_INDEX]));
		await order.save();
		const newOrder = {
			patientId: order.patientId,
			details: order.details,
			amount: order.amount,
		};
		const res = await request(app).post('/order').send({ order: newOrder });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patientId.toString()).toBe(order.patientId.toString());
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const order = {
			patientId: id,
			details: [],
			amount: faker.number.int,
		};
		const res = await request(app).post('/order').send({ order });
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /order', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the order', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const patient2 = new PatientModel(generatePatient());
		await patient2.save();
		const order = new OrderModel(generateOrder(patient._id, ORDER_STATUS[ZERO_INDEX]));
		await order.save();
		const updatedOrder = {
			patientId: patient2._id,
			status: ORDER_STATUS[ONE],
		};
		const res = await request(app)
			.patch(`/order/${order._id}`)
			.send({ order: updatedOrder });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patientId.toString()).toBe(updatedOrder.patientId.toString());
		expect(res._body.status).toBe(updatedOrder.status);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const order = {
			patientId: id,
		};
		const res = await request(app).patch(`/order/${id}`).send({ order });
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /order/pending', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve pending orders', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const len = faker.number.int({ min: 5, max: 10 });
		for (let i = 0; i < len; i++) {
			const order = new OrderModel(generateOrder(patient._id, ORDER_STATUS[ZERO_INDEX]));
			await order.save();
		}
		for (let i = 0; i < len; i++) {
			const order = new OrderModel(generateOrder(patient._id, ORDER_STATUS[ONE]));
			await order.save();
		}
		const res = await request(app).get('/order/pending');
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.length).toBe(len);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
