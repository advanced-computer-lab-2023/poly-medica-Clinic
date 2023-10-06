import mongoose from 'mongoose';
import PatientModel from '../models/Patient.js';
import PerscriptionModel from '../models/Perscription.js';

class PatientRepository {
    async findAllPatients() {
        const allPatients = await PatientModel.find();
        return allPatients;
    }


}

export default PatientRepository;