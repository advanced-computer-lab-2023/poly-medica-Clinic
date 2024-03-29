
import HealthPackageRepository from '../database/repository/health-package-repository.js';

class HealthPackageService {
	constructor() {
		this.repository = new HealthPackageRepository();
	}

	async getAllPackages() {
		const packages = await this.repository.findAllPackages();
		if (packages) {
			return packages;
		} else {
			console.log('no data was found');
		}
	}
	
	async createNewPackage(
		name,
		price,
		discountOfDoctor,
		discountOfMedicin,
		discountOfFamily,
	) {
		const newPackage  = await this.repository.addPackage(
			name,
			price,
			discountOfDoctor,
			discountOfMedicin,
			discountOfFamily,
		);
		return newPackage;
	}

	async updatePackage(id, updateData){
		const { updatedPackage } = await this.repository.updatePackage(id, updateData);
		return updatedPackage;
	}

	async deletePackage(id) {
		const deletedPackage = await this.repository.deletePackage(id);
		return deletedPackage;
	}
}

export default HealthPackageService;
