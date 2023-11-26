import PrescriptionModel from '../models/Prescription.js';

class PrescriptionRepository {
	async addPrescription(prescription) {
		const newPrescription = await PrescriptionModel.create(prescription);
		return newPrescription;
	}

	async updatePrescription(prescriptionId, prescription) {
		const updatedPrescription = await PrescriptionModel.findOneAndUpdate(
			{ _id: prescriptionId },
			prescription,
			{ new: true, runValidators: true },
		);
		return updatedPrescription;
	}
}

export default PrescriptionRepository;
