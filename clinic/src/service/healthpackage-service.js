
import HealthPackageRepository from '../database/repository/healthpackage-repository.js';

class HealthPackageService {
	constructor() {
		this.repository = new HealthPackageRepository();

	}

	async getAllPackages(){
		const packages = await this.repository.findAllPackages();
		if(packages){
			return packages;
		}else{
			console.log('no data was found');
		}
        
	}
	async createNewPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily){
        
		const { newPackage } = await this.repository.addPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily);
		return newPackage;
	}

	// async updatePackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily){
       
	// }

	async deletePackage(id){
		const deletedPackage = await this.repository.deletePackage(id);
		return deletedPackage;
	}
}

export default HealthPackageService;
