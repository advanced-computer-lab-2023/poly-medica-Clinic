import mongoose from 'mongoose';
import HealthPackageModel  from '../models/HealthPackage.js';
import DoctorModel from '../models/Doctor.js';
import AdminModel from '../models/Admin.js';

class ClinicRepository{
    async findAllPackages(){
        const allPackages = await HealthPackageModel.find();
        return allPackages;
    };
    
    async addPackage(name, price, discountOfDoctor,  discountOfMedicin, discountOfFamily) {
        const newPackage = new HealthPackageModel({
            name,
            price, 
            discountOfDoctor, 
            discountOfMedicin, 
            discountOfFamily
        });
        const packageResult = await newPackage.save();
        return packageResult;
    };

    async deletePackage(id){
        const packageDeleted = await HealthPackageModel.findByIdAndDelete(id);
        return packageDeleted;
    }

    async addDoctor(req){
        const { userData, speciality, hourlyRate, affiliation, educationalBackground } = req.body;
        const user = await DoctorModel.addDoctor(userData, speciality, hourlyRate, affiliation, educationalBackground);
        return user;
    }

    async addAdmin(req){
        const { userData, mainAdmin } = req.body;
        const user = await DoctorModel.addDoctor(userData, mainAdmin);
        return user;
    }

   
}

export default ClinicRepository;