
import HealthPackageModel  from '../models/HealthPackage.js';

class HealthPackageRepository{
	async findAllPackages(){
		const allPackages = await HealthPackageModel.find();
		return allPackages;
	}
    
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
	}

	async deletePackage(id){
		const packageDeleted = await HealthPackageModel.findByIdAndDelete(id);
		return packageDeleted;
	}

	async updatePackage(id, updateData){
        const packageUpdated = await HealthPackageModel.findByIdAndUpdate(id, {$set: updateData});
        return packageUpdated;
    }

   
}

export default HealthPackageRepository;

