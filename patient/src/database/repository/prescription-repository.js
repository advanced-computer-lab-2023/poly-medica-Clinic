import PrescriptionModel from '../models/Prescription.js';

class PrescriptionRepository {
	
	async findAllPrescriptions() {
		const allPrescriptions = await PrescriptionModel.find();
		return allPrescriptions;
	}

	async findPrescriptionById(id) {
		const prescription = await PrescriptionModel.findById(id);
		return prescription;
	}
}

export default PrescriptionRepository;