import PrescriptionRepository from '../database/repository/prescription-repository.js';

class PrescriptionService {
	constructor() {
		this.repository = new PrescriptionRepository();
	}
    
	async getAllPrescriptions() {
		const prescriptions = await this.repository.findAllPrescriptions();
		return prescriptions;
	}

	async getPrescriptionById(id) {
		const prescription = await this.repository.findPrescriptionById(id);
		return prescription;
	}

}

export default PrescriptionService;