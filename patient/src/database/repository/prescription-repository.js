import PrescriptionModel from '../models/Prescription.js';
import { getFile } from '../../utils/CommonUtils.js';
import { PRESCRIPTION_FOLDER_NAME } from '../../utils/Constants.js';

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

	async getPrescriptionById(prescriptionId) {
		const prescription = await PrescriptionModel.findById(prescriptionId);
		return prescription;
	}

	async getMedicinesByPrescriptionId(prescriptionId) {
		const prescription = await this.getPrescriptionById(prescriptionId);
		const medicines = prescription.medicines;
		return medicines;
	}

	getFile(fileName) {
		return getFile(PRESCRIPTION_FOLDER_NAME, fileName);
	}
}

export default PrescriptionRepository;
