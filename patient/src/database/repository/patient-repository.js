import PatientModel from '../models/Patient.js';

class PatientRepository {
	async getAllPatients() {
		const patients = await PatientModel.find();
		return patients;
	}

	async createPatient(patient) {
		const newPatient = await PatientModel.create(patient);
		return newPatient;
	}

	async deletePatient(id) {
		const deletedPatient = await PatientModel.findByIdAndDelete(id);
		return deletedPatient;
	}


}

export default PatientRepository;