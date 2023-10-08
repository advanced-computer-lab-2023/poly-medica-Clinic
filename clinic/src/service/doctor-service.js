import DoctorRepository from '../database/repository/doctor-repository.js';

class DoctorService {
	constructor() {
		this.repository = new DoctorRepository();
	}

	async createDoctor(doctor) {
		const newDoctor = await this.repository.createDoctor(doctor);
		return newDoctor;
	}

	async deleteDoctor(id) {
		const deletedDoctor = await this.repository.deleteDoctor(id);
		return deletedDoctor;
	}
}

export default DoctorService;
