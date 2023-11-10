import DoctorModel from '../models/Doctor.js';
import { getFile, deleteFile } from '../../utils/CommonUtils.js';
import {
	DOCTOR_FOLDER_NAME,
	DOCTOR_PROJECTION,
} from '../../utils/Constants.js';
import DoctoerReqModel from '../models/DoctorReq.js';
import AppointmentModel from '../models/Appointment.js';

class DoctorRepository {
	constructor() {
		this.model = DoctorModel;
	}

	async findAllDoctorRequests() {
		const doctorRequests = await DoctoerReqModel.find();
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

	async addDoctorReq(data) {
		const {
			userData,
			speciality,
			hourlyRate,
			affiliation,
			educationalBackground,
			documentsNames,
		} = data;
		const user = await DoctoerReqModel.addUser(
			userData,
			speciality,
			hourlyRate,
			affiliation,
			educationalBackground,
			documentsNames,
		);
		return user;
	}

	async findDoctorRequestById(id) {
		const doctorRequest = await DoctoerReqModel.findById(id);
		return doctorRequest;
	}

	async deleteDoctorRequest(id) {
		const doctorRequest = await DoctoerReqModel.findByIdAndDelete(id);
		return doctorRequest;
	}

	async checkDoctorReqUser(req) {
		const { email, userName } = req.body;
		if (email) {
			const checkUserEmail = await DoctoerReqModel.findOne({
				'userData.email': email,
			});
			if (checkUserEmail) {
				throw new Error('that email is already registered');
			}
		}

		const checkUserUserName = await DoctoerReqModel.findOne({
			'userData.userName': userName,
		});
		if (checkUserUserName) {
			throw new Error('that username is already registered');
		}
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

	getFile(fileName) {
		return getFile(DOCTOR_FOLDER_NAME, fileName);
	}

	deleteFile(fileName) {
		return deleteFile(DOCTOR_FOLDER_NAME, fileName);
	}
}

export default DoctorRepository;
