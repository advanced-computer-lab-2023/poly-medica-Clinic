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

	async getPrescriptionById(prescriptionId) {
		const prescription = await this.repository.getPrescriptionById(
			prescriptionId,
		);
		return prescription;
	}

	async getMedicinesByPrescriptionId(prescriptionId) {
		const medicines = await this.repository.getMedicinesByPrescriptionId(
			prescriptionId,
		);
		return medicines;
	}

	getFile(fileName) {
		return this.repository.getFile(fileName);
	}
}

export default PrescriptionService;
