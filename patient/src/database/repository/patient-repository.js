import mongoose from 'mongoose';
import PatientModel from '../models/Patient.js';
import PerscriptionModel from '../models/Perscription.js';

class PatientRepository {
    async findAllPatients() {
        const allPatients = await PatientModel.find();
        return allPatients;
    }

    async signupUser(req){
        const { name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact } = req.body;
        let user = await User.signup(name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact);
        return user;
    }

}

export default PatientRepository;