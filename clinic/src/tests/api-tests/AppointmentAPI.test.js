import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/TestingUtils.js';
import { 
	OK_STATUS_CODE,
	ONE, ERROR_STATUS_CODE,
	TIME_OUT,
	PATIENTS_BASE_URL
} from '../../utils/Constants.js';

import AppointmentModel from '../../database/models/Appointment.js';
import DoctorModel from '../../database/models/Doctor.js';
import generateDoctor from '../model-generators/generateDoctor.js';
import generateAppointment from '../model-generators/generateAppointment.js';


import axios from 'axios';
import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

jest.setTimeout(TIME_OUT);

describe('POST /appointments', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and the created appointment', async () => {
		let doctor = new DoctorModel(generateDoctor());
		await doctor.save();

		let availableSlots = doctor.availableSlots;
		const availableSlotsIdx = faker.number.int({
			min: 0,
			max: availableSlots.length - ONE,
		});
		const selectedSlot = availableSlots[availableSlotsIdx];
		const patientId = faker.database.mongodbObjectId();
		const doctorId = doctor._id.toString();
		const appointmentData = generateAppointment(patientId, doctorId);
		appointmentData.date = selectedSlot.from;
		appointmentData.availableSlotsIdx = availableSlotsIdx;

		// await printAllDoctors(NEGONE); //(runInBand needed here)
		const res = await request(app)
			.post('/appointments')
			.send({ items: appointmentData });
		// await printAllDoctors(ONE);

		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patientId).toEqual(patientId);
		expect(res._body.doctorId).toEqual(doctorId);
		// ensuring that the selected availableSlot is removed
		doctor = await DoctorModel.findById(doctorId);
		availableSlots = doctor.availableSlots;
		for (let i = 0; i < availableSlots.length; i++) {
			expect(availableSlots[i].from).not.toEqual(selectedSlot.from);
			expect(availableSlots[i].until).not.toEqual(selectedSlot.until);
		}
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /appointments/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and get all appointments reservered with doctor', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();

		const len = faker.number.int({ min: 5, max: 10 });
		for (let i = 0; i < len; i++) {
			const patientId = faker.database.mongodbObjectId();
			const doctorId = doctor._id.toString();
			const appointment = new AppointmentModel(generateAppointment(patientId, doctorId));
			await appointment.save();
		}

		const res = await request(app)
			.get(`/appointments/${doctor._id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.length).toEqual(len);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/appointments/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /appointments/complete/:appointmentId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and the updated appointment', async () => {
		const patientId = faker.database.mongodbObjectId();
		const doctorId = faker.database.mongodbObjectId();
		const appointment = new AppointmentModel(generateAppointment(patientId, doctorId));
		await appointment.save();

		const res = await request(app)
			.patch(`/appointments/complete/${appointment._id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.status).toEqual('Complete');
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/appointments/complete/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /appointments/reschedule/:appointmentId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and the updated appointment', async () => {
		let doctor = new DoctorModel(generateDoctor());
		await doctor.save();

		let availableSlots = doctor.availableSlots;
		const availableSlotsIdx = faker.number.int({
			min: 0,
			max: availableSlots.length - ONE,
		});

		const appointment = new AppointmentModel(generateAppointment(faker.database.mongodbObjectId(), doctor._id));
		await appointment.save();
		
		const oldAppointmentDate = appointment.date; 
		const newAppointmentDate = doctor.availableSlots[availableSlotsIdx].from;

		const res = await request(app)
			.patch(`/appointments/reschedule/${appointment._id}`)
			.send({
				doctorId: doctor._id,
				availableSlotsIdx
			});
		expect(res.status).toBe(OK_STATUS_CODE);

		// verify new appointment date
		const updatedAppointment = res._body;
		expect(new Date(updatedAppointment.date)).toEqual(newAppointmentDate);

		// verify that newSlot is removed
		doctor = await DoctorModel.findById(doctor._id);
		availableSlots = doctor.availableSlots;
		for(let i=0 ; i<availableSlots.length ; i++){
			const currentDate = availableSlots[i].from;
			expect(currentDate).not.toEqual(newAppointmentDate);
		}

		// verify that oldSlot is added back
		expect(availableSlots[availableSlots.length-ONE].from).toEqual(oldAppointmentDate);

	});

	it('should return 500 when id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app)
			.patch(`/appointments/reschedule/${id}`);

		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

jest.mock('axios');
describe('PATCH /appointments/cancel/:appointmentId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and cancel appointment without refund', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();

		const appointment = new AppointmentModel(generateAppointment(faker.database.mongodbObjectId(), doctor._id));
		await appointment.save();

		const res = await request(app)
			.patch(`/appointments/cancel/${appointment._id}`)
			.send({
				doctorId: doctor._id,
				appointmentDate: appointment.date,
				refund: false
			});
		expect(res.status).toBe(OK_STATUS_CODE);

		// verify that appointment is cancelled
		const updatedAppointment = res._body;
		expect(updatedAppointment.status).toEqual('Cancelled');

		// verify that availableSlot is added back
		const updatedDoctor = await DoctorModel.findById(doctor._id);
		const availableSlots = updatedDoctor.availableSlots;
		expect(availableSlots[availableSlots.length-ONE].from).toEqual(appointment.date);
	});

	it('should return 200 OK and cancel appointment with refund', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();

		const appointment = new AppointmentModel(generateAppointment(faker.database.mongodbObjectId(), doctor._id));
		await appointment.save();

		axios.patch.mockResolvedValue({});
		const res = await request(app)
			.patch(`/appointments/cancel/${appointment._id}`)
			.send({
				doctorId: doctor._id,
				appointmentDate: appointment.date,
				refund: true,
				patientId: appointment.patientId,
				pricePaidByPatient: appointment.pricePaidByPatient,
				pricePaidToDoctor: appointment.pricePaidToDoctor
			});
		expect(res.status).toBe(OK_STATUS_CODE);

		// verify that appointment is cancelled
		const updatedAppointment = res._body;
		expect(updatedAppointment.status).toEqual('Cancelled');

		// verify that availableSlot is added back
		const updatedDoctor = await DoctorModel.findById(doctor._id);
		const availableSlots = updatedDoctor.availableSlots;
		expect(availableSlots[availableSlots.length-ONE].from).toEqual(appointment.date);

		// verify that money is deducted from doctor's wallet
		const oldWallet = doctor.walletAmount;
		const updatedWallet = updatedDoctor.walletAmount;
		expect(updatedWallet).toEqual(oldWallet-appointment.pricePaidToDoctor);

		// verify that money is added to patient's wallet
		expect(axios.patch).toHaveBeenCalledWith(`${PATIENTS_BASE_URL}/patients/${appointment.patientId}/wallet`, {
			walletChange: appointment.pricePaidByPatient
		});
	});

	it('should return 500 when id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app)
			.patch(`/appointments/cancel/${id}`);

		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /appointments/follow-up-requests', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and the created appointmentfollowUp', async () => {
		let doctor = new DoctorModel(generateDoctor());
		await doctor.save();

		let availableSlots = doctor.availableSlots;
		const availableSlotsIdx = faker.number.int({
			min: 0,
			max: availableSlots.length - ONE,
		});
		const selectedSlot = availableSlots[availableSlotsIdx];
		const patientId = faker.database.mongodbObjectId();
		const doctorId = doctor._id.toString();
		const appointmentData = generateAppointment(patientId, doctorId);
		appointmentData.type = 'follow-up';
		appointmentData.date = selectedSlot.from;
		appointmentData.availableSlotsIdx = availableSlotsIdx;

		const res = await request(app)
			.post('/appointments/follow-up-requests')
			.send(appointmentData);

		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patientId).toEqual(patientId);
		expect(res._body.doctorId).toEqual(doctorId);
		// ensuring that the selected availableSlot is removed
		doctor = await DoctorModel.findById(doctorId);
		availableSlots = doctor.availableSlots;
		for (let i = 0; i < availableSlots.length; i++) {
			expect(availableSlots[i].from).not.toEqual(selectedSlot.from);
			expect(availableSlots[i].until).not.toEqual(selectedSlot.until);
		}
		// ensuring that it's a followUp
		expect(res._body.type).toEqual('follow-up');
		expect(res._body.followUpData.isValid).toBeTruthy();
	});
	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /appointments/follow-up-requests/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	const generateAppointments = async (doctorId, patientId, followUpRequestsCount) => {
		for (let i = 0; i < followUpRequestsCount; i++) {
			const appointment = new AppointmentModel(generateAppointment(patientId, doctorId));
			appointment.type = 'follow-up';
			appointment.followUpData = {
				isValid: true,
				accepted: faker.datatype.boolean(),
				handled: faker.datatype.boolean()
			};
			await appointment.save();
		}
		const lenNormalAppointments = faker.number.int({ min: 5, max: 10 });
		for (let i = 0; i < lenNormalAppointments; i++) {
			const appointment = new AppointmentModel(generateAppointment(patientId, doctorId));
			await appointment.save();
		}
	};

	it('should return 200 OK and get all follow-up requests to a doctor', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const patientId = faker.database.mongodbObjectId();
		const len = faker.number.int({ min: 5, max: 10 });
		await generateAppointments(doctor._id.toString(), patientId, len);
		const res = await request(app)
			.get(`/appointments/follow-up-requests/${doctor._id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.length).toEqual(len);
	});
	
	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/appointments/follow-up-requests/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /appointments/follow-up-requests/handle/:appointmentId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});
	
	it('should return 200 OK and the accepted appointment', async () => {
		const patientId = faker.database.mongodbObjectId();
		const doctorId = faker.database.mongodbObjectId();
		const appointment = new AppointmentModel(generateAppointment(patientId, doctorId));
		appointment.type = 'follow-up';
		appointment.followUpData = {
			isValid: true,
			accepted: false,
			handled: false
		};
		await appointment.save();

		const res = await request(app)
			.patch(`/appointments/follow-up-requests/handle/${appointment._id}`)
			.send({
				accepted: true
			});
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.followUpData.handled).toBeTruthy();
		expect(res._body.followUpData.accepted).toBeTruthy();
	});

	it('should return 200 OK and the rejected appointment', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const patientId = faker.database.mongodbObjectId();
		const appointment = new AppointmentModel(generateAppointment(patientId, doctor._id.toString()));
		appointment.type = 'follow-up';
		appointment.followUpData = {
			isValid: true,
			accepted: false,
			handled: false
		};
		await appointment.save();

		const res = await request(app)
			.patch(`/appointments/follow-up-requests/handle/${appointment._id}`)
			.send({
				accepted: false,
				doctorId: appointment.doctorId,
				appointmentDate: appointment.date
			});
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.followUpData.handled).toBeTruthy();
		expect(res._body.followUpData.accepted).toBeFalsy();
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/appointments/follow-up-requests/handle/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});