import mongoose from 'mongoose';
import {HealthPackageModel}  from '../models';

class ClinicRepository{
    async findAllPackages(){
        const allPackages = await HealthPackageModel.find();
        return allPackages;
    }

    async addPackage(name, price, discountOfDoctor,  discountOfMedicin, discountOfFamily){
        const newPackage = new HealthPackageModel({
            name,
            price, 
            discountOfDoctor, 
            discountOfMedicin, 
            discountOfFamily
        });
        const packageResult = newPackage.save();
        return packageResult;
    }
}

export default ClinicRepository;