import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import {
	FAMILY_MEMBERS_PROJECTION,
	PATIENT_ADDRESSES_PROJECTION,
	ONE,
	ZERO,
} from '../../utils/Constants.js';

class PatientRepository {
	async findAllPatients() {
		const allPatients = await PatientModel.find();
		return allPatients;
	}

	async findPatientById(id) {
		const patient = await PatientModel.findById(id);
		return patient;
	}

	async findFamilyMembers(id) {
		console.log('id = ', id);
		const familyMembers = await PatientModel.findById(
			id,
			FAMILY_MEMBERS_PROJECTION
		);
		console.log('Family = ', familyMembers);
		return familyMembers;
	}

	async findRegeisteredFamilyMember(attributes) {
		return await PatientModel.findOne({
			$or: [
				{ email: attributes.email },
				{ mobileNumber: attributes.mobileNumber },
			],
		});
	}

	async findPatientById(PatientId) {
		return await PatientModel.findOne({ _id: PatientId }, '-password -healthrecords -familyMembers');
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

	async createPatient(patient) {
		const newPatient = await PatientModel.create(patient);
		return newPatient;
	}

	async deletePatient(id) {
		const deletedPatient = await PatientModel.findByIdAndDelete(id);
		return deletedPatient;
	}

	async signupUser(req) {
		const {
			name,
			email,
			password,
			userName,
			dateOfBirth,
			gender,
			mobileNumber,
			emergencyContact,
		} = req.body;
		const user = await PatientModel.signup(
			name,
			email,
			password,
			userName,
			dateOfBirth,
			gender,
			mobileNumber,
			emergencyContact
		);
		return user;
	}

	async findPatientAddresses(id) {
		const addresses = await PatientModel.findById(
			id,
			PATIENT_ADDRESSES_PROJECTION
		);
		if (addresses) {
			addresses.deliveryAddresses.sort((a, b) => {
				return a.primary ? -ONE : b.primary ? ONE : ZERO;
			});
		}
		return addresses;
	}

	async updatePatientAddress(id, address) {
		const addresses = await PatientModel.findOneAndUpdate(
			{ _id: id },
			{ deliveryAddresses: address },
			{ new: true, runValidators: true }
		).select(PATIENT_ADDRESSES_PROJECTION);
		if (addresses) {
			addresses.deliveryAddresses.sort((a, b) => {
				return a.primary ? -ONE : b.primary ? ONE : ZERO;
			});
		}
		return addresses;
	}
}

export default PatientRepository;
