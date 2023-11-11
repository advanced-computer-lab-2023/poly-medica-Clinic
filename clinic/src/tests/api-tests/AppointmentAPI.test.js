import request from 'supertest';
import app from '../../../app.js';
import { 
	connectDBTest,
	disconnectDBTest,
} from '../../utils/testing-utils.js';
import { OK_STATUS_CODE, ONE } from '../../utils/Constants.js';

import DoctorModel from '../../database/models/Doctor.js';
import generateDoctor from '../model-generators/generateDoctor.js';
import generateAppointment from '../model-generators/generateAppointment.js';


import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';
import { faker } from '@faker-js/faker';


// const NEGONE = -1;
// const printAllDoctors = async (num) => {
// 	const docs = await DoctorModel.find({});
// 	console.log('docsLen', docs.length, 'num', num);
// 	docs.forEach((doc) => {
// 		console.log('doc', doc);
// 	});
// };

describe('POST /appointments', () => {
    
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and the created appointment', async () => {
		let doctor = new DoctorModel(generateDoctor());
		await doctor.save();

		let availableSlots = doctor.availableSlots;
		const availableSlotsIdx = faker.number.int({ min: 0, max: availableSlots.length - ONE });
		const selectedSlot = availableSlots[availableSlotsIdx];
		const patientId = faker.database.mongodbObjectId();
		const doctorId = doctor._id.toString();
		const appointmentData = generateAppointment(patientId, doctorId);
		appointmentData.date = selectedSlot.from;
		appointmentData.availableSlotsIdx = availableSlotsIdx;

		// await printAllDoctors(NEGONE); //(runInBand needed here)
		const res = await request(app)
			.post('/appointments')
			.send(appointmentData);
		// await printAllDoctors(ONE);

		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patientId).toEqual(patientId);
		expect(res._body.doctorId).toEqual(doctorId);
		// ensuring that the selected availableSlot is removed
		doctor = await DoctorModel.findById(doctorId);
		availableSlots = doctor.availableSlots;
		for(let i=0 ; i<availableSlots.length ; i++){
			expect(availableSlots[i].from).not.toEqual(selectedSlot.from);
			expect(availableSlots[i].until).not.toEqual(selectedSlot.until);
		}
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});