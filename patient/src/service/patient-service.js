import PatientRepository from '../database/repository/patient-repository.js';

class PatientService {
	constructor() {
		this.repository = new PatientRepository();

	}

	async getAllPatient() {
		const patients = await this.repository.findAllPatients();
		return patients;

	}
}

export default PatientService;