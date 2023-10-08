import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import { FAMILY_MEMBERS_PROJECTION } from '../../utils/Constants.js';

class PatientRepository {
	async findAllPatients() {
		const allPatients = await PatientModel.find();
		return allPatients;
	}
	async findFamilyMembers(id) {
		const familyMembers = await PatientModel.findById(
			id,
			FAMILY_MEMBERS_PROJECTION
		);
		return familyMembers;
	}

	async addFamilyMember(id, familyMembers) {
		return await PatientModel.findOneAndUpdate(
			{ _id: id },
			{ familyMembers },
			{ new: true, runValidators: true }
		).select(FAMILY_MEMBERS_PROJECTION);
	}

	async findAllPrescriptions() {
		const allPrescriptions = await PrescriptionModel.find();
		return allPrescriptions;
	}

	async findPrescriptionById(id) {
		const prescription = await PrescriptionModel.findById(id);
		return prescription;
	}
}

export default PatientRepository;
