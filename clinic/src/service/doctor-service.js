import DoctorRepository from '../database/repository/doctor-repository.js';

class DoctorService {
	constructor() {
		this.repository = new DoctorRepository();
	}

	async getAllDoctors() {
		return await this.repository.findAllDoctors();
	}
}

export default DoctorService;
