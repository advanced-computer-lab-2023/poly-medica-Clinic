import PatientModel from '../models/Patient.js';

class PatientRepository {
	async getAllPatients() {
		const patients = await PatientModel.find();
		return patients;
	}

	async deletePatient(id) {
		const deletedPatient = await PatientModel.findByIdAndDelete(id);
		return deletedPatient;
	}


}

export default PatientRepository;