import PrescriptionRepository from '../database/repository/prescription-repository.js';

class PrescriptionService {
	constructor() {
		this.repository = new PrescriptionRepository();
	}
    
	async getAllPrescriptions() {
		const prescriptions = await this.repository.findAllPrescriptions();
		return prescriptions;
	}

}

export default PrescriptionService;