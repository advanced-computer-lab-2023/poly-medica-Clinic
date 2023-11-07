import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import axios from 'axios';
import { CLINIC_BASE_URL, FAMILY_MEMBERS_PROJECTION, HEALTH_PACKAGE_STATUS, PATIENT_FOLDER_NAME } from '../../utils/Constants.js';
import { patientHasPackage } from '../../utils/PatientUtils.js';
import { getImage } from '../../utils/ImageUtils.js';
class PatientRepository {
	async findAllPatients() {
		const allPatients = await PatientModel.find();
		return allPatients;
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

	async findPatientByUserName(userN) {
		return await PatientModel.findOne({ userName: userN });
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
		const { name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact } = req.body;
		const user = await PatientModel.signup(name, email, password, userName, dateOfBirth, gender, mobileNumber, emergencyContact);
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
			renewalDate: patientPackage.renewalDate
		});

		const filteredPackages = allPackages
			.filter((chosenPackage) => patientHasPackage(patient, chosenPackage))
			.map((chosenPackage) => combineAttributes(chosenPackage, patient.healthPackages.find((p) => p.packageId.toString() === chosenPackage._id.toString())));
		return filteredPackages;
	}


	async cancelHealthPackage(patientId, healthPackageId) {
		const patient = await PatientModel.findById(patientId);
		patient.healthPackages[0].status = HEALTH_PACKAGE_STATUS[0];
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
		const deletedRecord = patient.healthRecords.find((record) => record._id.toString() === recordId.toString());
		patient.healthRecords = patient.healthRecords.filter((record) => record._id.toString() !== recordId.toString());
		await patient.save();
		return deletedRecord;
	}

	async getOneRecord(patientId, recordId) {
		const patient = await PatientModel.findById(patientId);
		const record = patient.healthRecords.find((record) => record._id.toString() === recordId.toString());
		return record;
	}

	getPicture(picName) {
		const pictureName = picName;
		const picturePath = getImage(PATIENT_FOLDER_NAME, pictureName);
		return picturePath;
	}

}

export default PatientRepository;
