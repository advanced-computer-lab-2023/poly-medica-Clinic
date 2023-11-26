import PrescriptionRepository from '../database/repository/prescription-repository.js';

class PrescriptionService {
	constructor() {
		this.repository = new PrescriptionRepository();
	}

	async addPrescription(prescription) {
		const newPrescription = await this.repository.addPrescription(prescription);
		return newPrescription;
	}

	async updatePrescription(prescriptionId, prescription) {
		const updatedPrescription = await this.repository.updatePrescription(
			prescriptionId,
			prescription,
		);
		return updatedPrescription;
	}
}

export default PrescriptionService;
