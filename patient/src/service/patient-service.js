import PatientRepository from '../database/repository/patient-repository.js';

class PatientService {
	constructor() {
		this.repository = new PatientRepository();

	}

	async getAllPatients() {
		const patients = await this.repository.getAllPatients();
		return patients;
	}

	async createPatient(patient) {
		const newPatient = await this.repository.createPatient(patient);
		return newPatient;
	}

	async deletePatient(id) {
		const deletedPatient = await this.repository.deletePatient(id);
		return deletedPatient;
	}
}

export default PatientService;