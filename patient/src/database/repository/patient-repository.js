import mongoose from 'mongoose';
import {PatientModel  , PerscriptionModel}  from '../models';

class PatientRepository{
    async findAllPatients(){
        const allPatients = await PatientModel.find();
        return allPatients;
    }

    
}

export default PatientRepository;