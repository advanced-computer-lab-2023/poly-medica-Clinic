import PatientModel from '../models/Patient.js';

class PatientRepository {
	async findAllPatients() {
		const allPatients = await PatientModel.find();
		return allPatients;
	}
	
}

export default PatientRepository;