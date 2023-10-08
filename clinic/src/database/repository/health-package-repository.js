import HealthPackageModel from '../models/HealthPackage.js';

class HealthPackageRepository {
	async findAllPackages() {
		const allPackages = await HealthPackageModel.find();
		return allPackages;
	}

	async addPackage(
		name,
		price,
		discountOfDoctor,
		discountOfMedicin,
		discountOfFamily,
	) {
		const newPackage = new HealthPackageModel({
			name,
			price,
			discountOfDoctor,
			discountOfMedicin,
			discountOfFamily,
		});
		const packageResult = await newPackage.save();
		return packageResult;
	}

	async deletePackage(id) {
		const packageDeleted = await HealthPackageModel.findByIdAndDelete(id);
		return packageDeleted;
	}
}

export default HealthPackageRepository;
