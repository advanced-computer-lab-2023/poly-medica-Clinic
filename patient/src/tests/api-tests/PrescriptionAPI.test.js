import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	TIME_OUT,
} from '../../utils/Constants.js';

import PrescriptionModel from '../../database/models/Prescription.js';
import generatePrescription from '../model-generators/generatePrescription.js';

import {
	describe,
	beforeEach,
	afterEach,
	expect,
	it,
	jest,
} from '@jest/globals';
import { faker } from '@faker-js/faker';

jest.setTimeout(TIME_OUT);

describe('POST /prescriptions', () => {
	const addPrescription = async (prescription) => {
		return await request(app).post('/prescriptions').send({ prescription });
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and create a new prescription', async () => {
		const patientId = faker.database.mongodbObjectId();
		const doctorId = faker.database.mongodbObjectId();
		const prescription = generatePrescription(patientId, doctorId);
		const res = await addPrescription(prescription);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res.body.patientId).toBe(patientId);
		expect(res.body.doctorId).toBe(doctorId);
	});

	it('should return 500 ERROR when the prescription to be added is invalid', async () => {
		const patientId = faker.database.mongodbObjectId();
		const doctorId = faker.database.mongodbObjectId();
		const prescription = generatePrescription(patientId, doctorId);
		delete prescription.patientId;
		const res = await addPrescription(prescription);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /prescriptions/:prescriptionId', () => {
	const updatePrescription = async (prescriptionId, prescription) => {
		return await request(app)
			.patch(`/prescriptions/${prescriptionId}`)
			.send({ prescription });
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the prescription', async () => {
		const patientId = faker.database.mongodbObjectId();
		const doctorId = faker.database.mongodbObjectId();
		const prescription = new PrescriptionModel(
			generatePrescription(patientId, doctorId),
		);
		await prescription.save();
		const prescriptionId = prescription._id;
		prescription.description = 'Updated description';
		const res = await updatePrescription(prescriptionId, prescription);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res.body.description).toBe('Updated description');
	});

	it('should return 500 ERROR when the prescription to be updated is invalid', async () => {
		const patientId = faker.database.mongodbObjectId();
		const doctorId = faker.database.mongodbObjectId();
		const prescription = new PrescriptionModel(
			generatePrescription(patientId, doctorId),
		);
		const prescriptionId = prescription._id;
		const updatedPrescription = {};
		updatedPrescription.filled = 'Yes';
		const res = await updatePrescription(prescriptionId, updatedPrescription);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 ERROR when the prescription ID is invalid', async () => {
		const patientId = faker.database.mongodbObjectId();
		const doctorId = faker.database.mongodbObjectId();
		const prescription = generatePrescription(patientId, doctorId);
		const prescriptionId = faker.lorem.word();
		const res = await updatePrescription(prescriptionId, prescription);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
