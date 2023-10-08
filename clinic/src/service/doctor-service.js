import DoctorRepository from "../database/repository/doctor-repository.js";

class DoctorService {
	constructor() {
		this.repository = new DoctorRepository();
	}

	async deleteDoctor(id) {
		const deletedDoctor = await this.repository.deleteDoctor(id);
		return deletedDoctor;
	}
}

export default DoctorService;
