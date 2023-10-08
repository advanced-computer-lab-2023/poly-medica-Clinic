import PatientModel from '../models/Patient.js';

class PatientRepository {
	async findAllPatients() {
		const allPatients = await PatientModel.find();
		return allPatients;
	}

    async signupUser(req){
        const { name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact } = req.body;
        let user = await PatientModel.signup(name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact);
        return user;
    }

}

export default PatientRepository;