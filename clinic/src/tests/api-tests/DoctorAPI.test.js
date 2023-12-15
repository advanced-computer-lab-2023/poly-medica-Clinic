import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	ERROR_STATUS_CODE,
	SIXTY,
	THOUSAND,
	TIME_OUT,
} from '../../utils/Constants.js';

import DoctorModel from '../../database/models/Doctor.js';
import AppointmentModel from '../../database/models/Appointment.js';
import generateDoctor from '../model-generators/generateDoctor.js';
import generateAppointment from '../model-generators/generateAppointment.js';

import {
	describe,
	beforeEach,
	afterEach,
	expect,
	it,
	jest,
} from '@jest/globals';
import { faker } from '@faker-js/faker';
import axios from 'axios';
jest.mock('axios');
jest.setTimeout(TIME_OUT);
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
		for (let i = 0; i < len; i++) {
			const patientId = faker.database.mongodbObjectId();
			patients.push(patientId);
			const appointment = new AppointmentModel(
				generateAppointment(patientId, firstDoctor._id)
			);
			await appointment.save();
		}
		const patientId = faker.database.mongodbObjectId();
		patients.push(patientId);
		const appointment = new AppointmentModel(
			generateAppointment(patientId, secondDoctor._id)
		);
		await appointment.save();

		const axiosResponse = {
			data: {
				patients: patients.map((patient) => {
					return {
						_id: patient,
					};
				}),
			},
		};

		axios.get.mockResolvedValue(axiosResponse);
		const res = await request(app).get(
			`/doctors/${firstDoctor._id}/patients`
		);
		expect(res.status).toBe(OK_STATUS_CODE);
		const retrievedPatientsIds = [];
		res._body.finalListOFPatients.forEach((patient) => {
			retrievedPatientsIds.push(patient._id);
		});
		expect(retrievedPatientsIds.length).toBe(len);
		for (let i = 0; i < len; i++) {
			expect(retrievedPatientsIds.includes(patients[i])).toBe(true);
		}
		expect(retrievedPatientsIds.includes(patients[len])).toBe(false);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/doctors/${id}/patients`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /doctors/:id/status', () => {
	beforeEach(async () => {
		await connectDBTest();
	});
	it('should return 200 OK and retrieve the status correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const res = await request(app).get(`/doctors/${id}/status`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.status).toBe(doctor.status);
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/doctors/${id}/status`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/doctors/${id}/status`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /doctors/:id/status', () => {
	beforeEach(async () => {
		await connectDBTest();
	});
	it('should return 200 OK and update the status correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const res = await request(app).post(`/doctors/${id}/status`);
		expect(res.status).toBe(OK_STATUS_CODE);
		const updatedDoctor = await DoctorModel.findById(id);
		expect(updatedDoctor.status).toBe(true);
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).post(`/doctors/${id}/status`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).post(`/doctors/${id}/status`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /doctors/:id/name', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the name correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const res = await request(app).get(`/doctors/${id}/name`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.name).toBe(doctor.userData.name);
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/doctors/${id}/name`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/doctors/${id}/name`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /doctors/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the doctor correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const number = faker.number.int({ min: 20, max: 1000 });
		const RandomAffiliation = faker.company.name();
		const randomEmail = faker.internet.email();
		const res = await request(app).patch(`/doctors/${id}`).send({
			email: randomEmail,
			hourlyRate: number,
			affiliation: RandomAffiliation,
		});
		expect(res.status).toBe(OK_STATUS_CODE);
		const updatedDoctor = await DoctorModel.findById(id);
		expect(updatedDoctor.hourlyRate).toBe(number);
		expect(updatedDoctor.userData.email).toBe(randomEmail);
		expect(updatedDoctor.affiliation).toBe(RandomAffiliation);
	});

	it('should return 200 OK and update the doctor correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const randomEmail = faker.internet.email();
		const res = await request(app).patch(`/doctors/${id}`).send({
			email: randomEmail,
		});
		expect(res.status).toBe(OK_STATUS_CODE);

		const updatedDoctor = await DoctorModel.findById(id);
		expect(updatedDoctor.userData.email).toBe(randomEmail);
	});

	it('should return 200 OK and update the doctor correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const number = faker.number.int({ min: 20, max: 1000 });
		const RandomAffiliation = faker.company.name();
		const res = await request(app).patch(`/doctors/${id}`).send({
			hourlyRate: number,
			affiliation: RandomAffiliation,
		});
		expect(res.status).toBe(OK_STATUS_CODE);

		const updatedDoctor = await DoctorModel.findById(id);
		expect(updatedDoctor.hourlyRate).toBe(number);
		expect(updatedDoctor.affiliation).toBe(RandomAffiliation);
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).patch(`/doctors/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/doctors/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /appointments', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the appointments correctly', async () => {
		await AppointmentModel.deleteMany({});
		const firstDoctor = new DoctorModel(generateDoctor());
		const len = faker.number.int({ min: 2, max: 10 });
		const appointments = [];
		for (let i = 0; i < len; i++) {
			const patientId = faker.database.mongodbObjectId();
			const appointment = new AppointmentModel(
				generateAppointment(patientId, firstDoctor._id)
			);
			await appointment.save();
			appointments.push(appointment);
		}

		const res = await request(app).get('/appointments');
		console.log('dsdsds', res._body);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.allAppointments.length).toBe(len);
		for (let i = 0; i < len; i++) {
			expect(res._body.allAppointments[i]._id).toBe(
				appointments[i]._id.toString()
			);
		}
	});
	it('should return 404 NOT FOUND when the appointments are not found', async () => {
		await AppointmentModel.deleteMany({});
		const res = await request(app).get('/appointments');
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /patients', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patients correctly', async () => {
		const len = faker.number.int({ min: 2, max: 10 });
		const patients = [];
		for (let i = 0; i < len; i++) {
			const patientId = faker.database.mongodbObjectId();
			patients.push(patientId);
		}

		const axiosResponse = {
			data: {
				patients: patients.map((patient) => {
					return {
						_id: patient,
					};
				}),
			},
		};

		axios.get.mockResolvedValue(axiosResponse);
		const res = await request(app).get('/patients');
		expect(res.status).toBe(OK_STATUS_CODE);
		const retrievedPatientsIds = [];
		res._body.allPatients.forEach((patient) => {
			retrievedPatientsIds.push(patient._id);
		});
		expect(retrievedPatientsIds.length).toBe(len);
		for (let i = 0; i < len; i++) {
			expect(retrievedPatientsIds.includes(patients[i])).toBe(true);
		}
		expect(retrievedPatientsIds.includes(patients[len])).toBe(false);
	});

	it('should return 404 NOT FOUND when the patients are not found', async () => {
		const axiosResponse = {
			data: {
				patients: [],
			},
		};
		axios.get.mockResolvedValue(axiosResponse);
		const res = await request(app).get('/patients');
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /doctors/:id/slots', () => {
	beforeEach(async () => {
		await connectDBTest();
	});
	it('should return 200 OK and retrieve the slots correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const res = await request(app).get(`/doctors/${id}/slots`);
		expect(res.status).toBe(OK_STATUS_CODE);
		console.log('dsdsddsds', res._body);

		for (let i = 0; i < doctor.availableSlots.length; i++) {
			expect(new Date(res._body[i].from)).toStrictEqual(
				doctor.availableSlots[i].from
			);
			expect(new Date(res._body[i].until)).toStrictEqual(
				doctor.availableSlots[i].until
			);
		}
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/doctors/${id}/slots`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/doctors/${id}/slots`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /doctors/:id/slots', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and post the slots correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		//generate random date
		const from = faker.date.future();
		//utile is a date after from by 1 hour
		const until = new Date(from.getTime() + SIXTY * SIXTY * THOUSAND);

		await doctor.save();
		const id = doctor._id.toString();
		const res = await request(app)
			.post(`/doctors/${id}/slots`)
			.send({ from });
		expect(res.status).toBe(OK_STATUS_CODE);

		console.log('dsdsddsds', res._body);
		for (let i = 0; i < doctor.availableSlots.length; i++) {
			expect(new Date(res._body[i].from)).toStrictEqual(
				doctor.availableSlots[i].from
			);
			expect(new Date(res._body[i].until)).toStrictEqual(
				doctor.availableSlots[i].until
			);
		}
		expect(
			new Date(res._body[doctor.availableSlots.length].from)
		).toStrictEqual(from);
		expect(
			new Date(res._body[doctor.availableSlots.length].until)
		).toStrictEqual(until);
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).post(`/doctors/${id}/slots`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).post(`/doctors/${id}/slots`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /doctors', () => {

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve all doctors correctly', async () => {
		const len = faker.number.int({ min: 5, max: 10 });
		for (let i = 0; i < len; i++) {
			const doctor = new DoctorModel(generateDoctor());
			await doctor.save();
		}
		const res = await request(app).get('/doctors');
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.length).toBe(len);
	});
	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /doctors/:id/wallet', () => {

	beforeEach(async () => {
		await connectDBTest();
	});
	it('should return 200 OK and retrieve the wallet correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const id = doctor._id.toString();
		const res = await request(app).get(`/doctors/${id}/wallet`);
		console.log('res._body', res._body);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.walletAmount).toBe(doctor.walletAmount);
	});

	it('should return 404 NOT FOUND when the doctor is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/doctors/${id}/wallet`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/doctors/${id}/wallet`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	}
	);


	afterEach(async () => {
		await disconnectDBTest();
	});
}
);

describe('DELETE /doctors/:id', () => {
	const deleteDoctor = async (id) => {
		const response = await request(app).delete(`/doctors/${id}`);
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when deleting a doctor', async () => {
		const doctor = await DoctorModel(generateDoctor()).save();
		const response = await deleteDoctor(doctor._id);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.deletedDoctor.userData.userName).toBe(
			doctor.userData.userName,
		);
	});

	it('should return 404 when doctor not found', async () => {
		const id = faker.database.mongodbObjectId();
		const response = await deleteDoctor(id);

		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 when id is invalid', async () => {
		const id = faker.lorem.word();
		const response = await deleteDoctor(id);

		expect(response.status).toBe(ERROR_STATUS_CODE);
		expect(response.body.message).toBe('Invalid ID');
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /doctors/:doctorId/wallet', () => {
	const updateWallet = async (doctorId, walletChange) => {
		return await request(app).patch(`/doctors/${doctorId}/wallet`).send({ walletChange });
	};
	const generateWalletChange = () => {
		return parseFloat(faker.finance.amount({ min: -1000, max: 1000, dec: 2 }));
	};
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 Ok and update wallet correctly', async () => {
		const doctor = new DoctorModel(generateDoctor());
		await doctor.save();
		const walletChange = generateWalletChange();
		const res = await updateWallet(doctor._id.toString(), walletChange);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.updatedDoctor.walletAmount).toBe(doctor.walletAmount + walletChange);
	});

	it('should return 400 when id is invalid', async () => {
		const id = faker.lorem.word();
		const walletChange = generateWalletChange();
		const res = await updateWallet(id, walletChange);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
