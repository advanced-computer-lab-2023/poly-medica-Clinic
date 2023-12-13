import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import axios from 'axios';
import {
	CLINIC_BASE_URL,
	FAMILY_MEMBERS_PROJECTION,
	HEALTH_PACKAGE_STATUS,
	PATIENT_FOLDER_NAME,
	ONE,
	ZERO,
	PATIENT_ADDRESSES_PROJECTION,
	ZERO_INDEX,
} from '../../utils/Constants.js';
import { patientHasPackage } from '../../utils/PatientUtils.js';
import { getImage } from '../../utils/ImageUtils.js';
class PatientRepository {
	async findAllPatients() {
		const allPatients = await PatientModel.find();
		return allPatients;
	}

	async findPatientById(id) {
		const patient = await PatientModel.findById(id, ' -password');
		return patient;
	}

	async findFamilyMembers(id) {
		console.log('id = ', id);
		const familyMembers = await PatientModel.findById(
			id,
			FAMILY_MEMBERS_PROJECTION,
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

	async addFamilyMember(id, familyMembers) {
		return await PatientModel.findOneAndUpdate(
			{ _id: id },
			{ familyMembers },
			{ new: true, runValidators: true },
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
			emergencyContact,
		);
		return user;
	}

	async addHealthPackage(patientId, healthPackage) {
		const patient = await PatientModel.findById(patientId);
		patient.healthPackages = [];
		patient.healthPackages.push(healthPackage);
		await patient.save();
		return patient;
	}

	async viewHealthPackages(patientId) {
		const packagesURL = `${CLINIC_BASE_URL}/packages`;
		let allPackages = await axios.get(packagesURL);
		allPackages = allPackages.data.allPackages;
		const patient = await PatientModel.findById(patientId);
		const combineAttributes = (healthPackage, patientPackage) => ({
			name: healthPackage.name,
			price: healthPackage.price,
			doctorDiscount: healthPackage.discountOfDoctor,
			medicineDiscoubnt: healthPackage.discountOfMedicin,
			familyDiscount: healthPackage.discountOfFamily,
			status: patientPackage.status,
			subscribtionDate: patientPackage.subscribtionDate,
			packageId: patientPackage.packageId,
			renewalDate: patientPackage.renewalDate,
		});
		const filteredPackages = allPackages
			.filter((chosenPackage) => patientHasPackage(patient, chosenPackage))
			.map((chosenPackage) =>
				combineAttributes(
					chosenPackage,
					patient.healthPackages.find(
						(p) => p.packageId.toString() === chosenPackage._id.toString(),
					),
				),
			);
		return filteredPackages;
	}

	async cancelHealthPackage(patientId, healthPackageId) {
		const patient = await PatientModel.findById(patientId);
		console.log(healthPackageId);
		patient.healthPackages[ZERO_INDEX].status =
			HEALTH_PACKAGE_STATUS[ZERO_INDEX];
		await patient.save();
		return patient;
	}

	async getHealthRecords(patientId) {
		const patient = await PatientModel.findById(patientId);
		return patient.healthRecords;
	}

	async addHealthRecord(patientId, healthRecord) {
		const patient = await PatientModel.findById(patientId);
		patient.healthRecords.push(healthRecord);
		await patient.save();
		return patient;
	}

	async deleteHealthRecord(patientId, recordId) {
		const patient = await PatientModel.findById(patientId);
		const deletedRecord = patient.healthRecords.find(
			(record) => record._id.toString() === recordId.toString(),
		);
		patient.healthRecords = patient.healthRecords.filter(
			(record) => record._id.toString() !== recordId.toString(),
		);
		await patient.save();
		return deletedRecord;
	}

	async getOneRecord(patientId, recordId) {
		const patient = await PatientModel.findById(patientId);
		const record = patient.healthRecords.find(
			(record) => record._id.toString() === recordId.toString(),
		);
		return record;
	}

	getPicture(picName) {
		const pictureName = picName;
		const picturePath = getImage(PATIENT_FOLDER_NAME, pictureName);
		return picturePath;
	}

	async getWalletAmount(id) {
		const user = await PatientModel.findById(id);
		return user.walletAmount;
	}
	async findPatientAddresses(id) {
		const addresses = await PatientModel.findById(
			id,
			PATIENT_ADDRESSES_PROJECTION,
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
			{ new: true, runValidators: true },
		).select(PATIENT_ADDRESSES_PROJECTION);
		if (addresses) {
			addresses.deliveryAddresses.sort((a, b) => {
				return a.primary ? -ONE : b.primary ? ONE : ZERO;
			});
		}
		return addresses;
	}

	async updateWalletAmount(id, walletChange) {
		const patient = await PatientModel.findById(id);
		patient.walletAmount += walletChange;
		await patient.save();
		return patient.walletAmount;
	}
}

export default PatientRepository;
