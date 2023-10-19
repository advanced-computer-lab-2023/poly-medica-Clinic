import request from 'supertest';
import app from '../../../app.js';
import { 
	connectDBTest,
	disconnectDBTest
} from '../../utils/testing-utils.js';
import { OK_STATUS_CODE } from '../../utils/Constants.js';

import DoctorModel from '../../database/models/Doctor.js';
import generateDoctor from '../model-generators/generateDoctor.js';

import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';

describe('GET /doctor/:id', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the doctor correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const res = await request(app).get(`/doctor/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.doctor._id).toBe(doctor.id);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});