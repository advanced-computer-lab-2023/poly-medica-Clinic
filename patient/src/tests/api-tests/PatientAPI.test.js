import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	ERROR_STATUS_CODE,
	ZERO_INDEX,
} from '../../utils/Constants.js';

import PrescriptionModel from '../../database/models/Prescription.js';
import generatePrescription from '../model-generators/generatePrescription.js';
import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';

import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';
import { faker } from '@faker-js/faker';

describe('GET /patient/:id/prescriptions (get all prescriptions of a patient)', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve all prescriptions correctly', async () => {
		const mainPatientId = faker.database.mongodbObjectId();
		const mainPatientPrescriptions = new Set();
		const cntPrescriptionsMainPatient = faker.number.int({
			min: 2,
			max: 10,
		});
		const cntOtherPrescriptions = faker.number.int({ min: 2, max: 10 });
		for (let i = 0; i < cntPrescriptionsMainPatient; i++) {
			const doctorId = faker.database.mongodbObjectId();
			const prescription = new PrescriptionModel(
				generatePrescription(mainPatientId, doctorId)
			);
			await prescription.save();
			mainPatientPrescriptions.add(prescription._id.toString());
		}
		for (let i = 0; i < cntOtherPrescriptions; i++) {
			const patientId = faker.database.mongodbObjectId();
			const doctorId = faker.database.mongodbObjectId();
			const prescription = new PrescriptionModel(
				generatePrescription(patientId, doctorId)
			);
			await prescription.save();
		}
		console.log(mainPatientId);
		const res = await request(app).get(
			`/patient/${mainPatientId}/prescriptions`
		);
		expect(res.status).toBe(OK_STATUS_CODE);

		expect(cntPrescriptionsMainPatient).toBe(res._body.length);
		res._body.forEach((retrievedPrescription) => {
			expect(
				mainPatientPrescriptions.has(retrievedPrescription._id)
			).toBeTruthy();
		});
	});

	it('should return 404 NOT FOUND no prescriptions are found', async () => {
		const patientId = faker.database.mongodbObjectId();
		const res = await request(app).get(
			`/patient/${patientId}/prescriptions`
		);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/patient/${id}/prescriptions`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /patients/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patient._id).toBe(patient.id);
	});

	it('should return 404 NOT FOUND when the patient is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

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

describe('GET /family-members/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient family members correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.familyMembers.length).toBe(
			patient.familyMembers.length
		);
	});

	it('should return 404 NOT FOUND when the patient family members are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({
			message: 'family members not found',
		});
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /family-members/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and add registered family member correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const familyMem = new PatientModel(generatePatient());
		await familyMem.save();
		const id = patient._id.toString();
		const res = await request(app)
			.patch(`/family-members/${id}`)
			.send({ member: { email: familyMem.email } });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.familyMembers[ZERO_INDEX].id.toString()).toBe(familyMem._id.toString());
	});

	it('should return 200 OK and add unregistered family member correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();

		const res = await request(app)
			.patch(`/family-members/${id}`)
			.send({ member: {} });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.id).toBeUndefined();
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/family-members/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
