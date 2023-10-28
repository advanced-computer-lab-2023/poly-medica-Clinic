import PatientModel from '../models/Patient.js';
import PrescriptionModel from '../models/Prescription.js';
import axios from 'axios';
import { CLINIC_BASE_URL, FAMILY_MEMBERS_PROJECTION, HEALTH_PACKAGE_STATUS } from '../../utils/Constants.js';
import { patientHasPackage } from '../../utils/PatientUtils.js';

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
		patient.healthPackages.forEach((healthPackage) => {
			if (healthPackage.status === HEALTH_PACKAGE_STATUS[1]) {
				healthPackage.status = HEALTH_PACKAGE_STATUS[2];
			}
		})
		patient.healthPackages.push(healthPackage);
		await patient.save();
		return patient;
	}

	async viewHealthPackages(patientId) {
		const packagesURL = `${CLINIC_BASE_URL}/packages`;
		let allPackages = await axios.get(packagesURL);
		allPackages = allPackages.data.allPackages;
		console.log('All packages == ', allPackages);
		const patient = await PatientModel.findById(patientId);
		return allPackages.filter((chosenPackage) => patientHasPackage(patient, chosenPackage));
	}

	async cancelHealthPackage(patientId, healthPackageId) {
		const patient = await PatientModel.findById(patientId);
		const chosenPackage = patient.healthPackages.filter((pack) => pack.packageId.toString() === healthPackageId.toString())[0];
		chosenPackage.status = HEALTH_PACKAGE_STATUS[0];
		await patient.save();
		return patient;
	}
}

export default PatientRepository;
