import request from 'supertest';
import app from '../../../app.js';
import { 
	connectDBTest,
	disconnectDBTest
} from '../../utils/testing-utils.js';
import { 
	OK_STATUS_CODE, 
	NOT_FOUND_STATUS_CODE, 
	ERROR_STATUS_CODE,
} from '../../utils/Constants.js';

import DoctorModel from '../../database/models/Doctor.js';
import AppointmentModel from '../../database/models/Appointment.js';
import generateDoctor from '../model-generators/generateDoctor.js';
import generateAppointment from '../model-generators/generateAppointment.js';

import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import axios from 'axios';
jest.mock('axios');

describe('GET /doctor/:id', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the doctor correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		// console.log('DoctorAPI doctor', doctor);
		const id = doctor._id.toString();
		const res = await request(app).get(`/doctor/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.doctor._id).toBe(doctor.id);
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/doctor/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/doctor/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});
	
	afterEach(async () => {
		await disconnectDBTest();
	});
});


describe('GET /doctors/:id/patients', () => {
	
	beforeEach(async () => {
		await connectDBTest();
	});
	it('should return 200 OK and retrieve the patients correctly', async () => {
		const firstDoctor = new DoctorModel(generateDoctor());
		const secondDoctor = new DoctorModel(generateDoctor());
		const len = faker.number.int({ min: 2, max: 10 });
		const patients = [];
		for(let i=0 ; i<len ; i++){
			const patientId = faker.database.mongodbObjectId();
			patients.push(patientId);
			const appointment = new AppointmentModel(generateAppointment(patientId, firstDoctor._id));
			await appointment.save();
		}
		const patientId = faker.database.mongodbObjectId();
		patients.push(patientId);
		const appointment = new AppointmentModel(generateAppointment(patientId, secondDoctor._id));
		await appointment.save();

		const axiosResponse = {
			data: {
				patients: patients.map((patient) => {
					return {
						_id: patient
					};
				})
			}
		};
		
		axios.get.mockResolvedValue(axiosResponse);
		const res = await request(app).get(`/doctors/${firstDoctor._id}/patients`);
		expect(res.status).toBe(OK_STATUS_CODE);
		const retrievedPatientsIds = [];
		res._body.finalListOFPatients.forEach((patient) => {
			retrievedPatientsIds.push(patient._id);
		});
		expect(retrievedPatientsIds.length).toBe(len);
		for(let i=0 ; i<len ; i++){
			expect(retrievedPatientsIds.includes(patients[i])).toBe(true);
		}
		expect(retrievedPatientsIds.includes(patients[len])).toBe(false);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

