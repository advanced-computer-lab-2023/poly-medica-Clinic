import PrescriptionModel from '../models/Prescription.js';

class PrescriptionRepository {
	
	async findAllPrescriptions() {
		const allPrescriptions = await PrescriptionModel.find();
		return allPrescriptions;
	}
    
}

export default PrescriptionRepository;