import DoctorRepository from '../database/repository/doctor-repository.js';

class DoctorService {
	constructor() {
		this.repository = new DoctorRepository();
	}

	async findAllDoctorRequests() {
		const doctorRequests = await this.repository.findAllDoctorRequests();
		return doctorRequests;
	}

	async addDoctor(req) {
		const doctorUser = await this.repository.addDoctor(req);
		return doctorUser;
	}

	async addReqDoctor(data) {
		const doctorUser = await this.repository.addDoctorReq(data);
		return doctorUser;
	}

	async getDoctorRequestById(id) {
		const doctorRequest = await this.repository.findDoctorRequestById(id);
		return doctorRequest;
	}

	async deleteDoctorRequest(id) {
		const doctorRequest = await this.repository.deleteDoctorRequest(id);
		return doctorRequest;
	}

	async findAllDoctors() {
		const doctors = await this.repository.findAllDoctors();
		return doctors;
	}

	async getDoctorById(id) {
		const doctor = await this.repository.findDoctorById(id);
		return doctor;
	}

	async createDoctor(doctor) {
		const newDoctor = await this.repository.createDoctor(doctor);
		return newDoctor;
	}

	async deleteDoctor(id) {
		const deletedDoctor = await this.repository.deleteDoctor(id);
		return deletedDoctor;
	}

	async findAllPatients(id) {
		const allPatients = await this.repository.findAllPatients(id);
		return allPatients;
	}
	async getAllAppointments() {
		const allAppointments = await this.repository.findAllAppointments();
		return allAppointments;
	}
	async updateDoctor(id, updates) {
		const doctor = await this.repository.updateDoctor(id, updates);
		return doctor;
	}

	async checkDoctorReqUser(req) {
		await this.repository.checkDoctorReqUser(req);
	}
	async getWalletAmount(id) {
		const amount = await this.repository.getWalletAmount(id);
		return amount;
	}
	getFile(fileName) {
		return this.repository.getFile(fileName);
	}

	deleteFile(fileName) {
		return this.repository.deleteFile(fileName);
	}

	async addSlot(id, from) {
		const doctor = await this.repository.addSlot(id, from);
		return doctor;
	}

	async updateWallet(doctorId, newWalletAmount){
		const doctor = await this.repository.updateWallet(doctorId, newWalletAmount);
		return doctor;
	}
}

export default DoctorService;
