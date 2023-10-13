import DoctorModel from '../models/Doctor.js';
import DoctorReqModel from '../models/DoctorReq.js';
import { DOCTOR_PROJECTION } from '../../utils/Constants.js';

import AppointmentModel from '../models/Appointment.js';

class DoctorRepository {
	constructor() {
		this.model = DoctorModel;
	}

	async findAllDoctorRequests() {
		const doctorRequests = await DoctorReqModel.find();
		return doctorRequests;
	}

	async addDoctor(req) {
		const {
			userData,
			speciality,
			hourlyRate,
			affiliation,
			educationalBackground,
		} = req.body;
		const user = await DoctorModel.addUser(
			userData,
			speciality,
			hourlyRate,
			affiliation,
			educationalBackground,
		);
		return user;
	}

	async addDoctorReq(req) {
		const {
			userData,
			speciality,
			hourlyRate,
			affiliation,
			educationalBackground,
		} = req.body;
		const user = await DoctorReqModel.addUser(
			userData,
			speciality,
			hourlyRate,
			affiliation,
			educationalBackground,
		);
		return user;
	}

	async deleteDoctorRequest(id) {
		const deletedDoctorRequest = await DoctorReqModel.findByIdAndDelete(id);
		return deletedDoctorRequest;
	}

	async createDoctor(doctor) {
		const newDoctor = await DoctorModel.create(doctor);
		return newDoctor;
	}

	async deleteDoctor(id) {
		const deletedDoctor = await DoctorModel.findByIdAndDelete(id);
		return deletedDoctor;
	}

	async findAllPatients(id) {
		try {
			let allPatients = await AppointmentModel.find({}).select(
				'patientId doctorId',
			);
			allPatients = allPatients
				.filter((appointment) => appointment.doctorId.toString() === id)
				.map((appointment) => appointment.patientId);

			return allPatients;
		} catch (err) {
			console.log(err);
		}
	}

	async findAllDoctors() {
		return await DoctorModel.find().select(DOCTOR_PROJECTION);
	}
	async findDoctorById(id) {
		const doctor = await DoctorModel.findById(id, '-userData.password');
		return doctor;
	}

	async findAllAppointments() {
		return await AppointmentModel.find();
	}
	async updateDoctor(id, updates) {
		let doctor = await DoctorModel.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});
		if (updates.email) {
			doctor = await DoctorModel.findOneAndUpdate(
				{ _id: id },
				{ 'userData.email': updates.email },
				{ new: true, runValidators: true },
			);
		}

		return doctor;
	}
}

export default DoctorRepository;
