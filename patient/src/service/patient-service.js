import PatientRepository from '../database/repository/patient-repository.js';

class PatientService {
	constructor() {
		this.repository = new PatientRepository();
	}

	async signupUser(req) {
		const user = await this.repository.signupUser(req);
		return user;
	}

	async findAllPatients() {
		const patients = await this.repository.findAllPatients();
		return patients;
	}

	async findOnePatient(id) {
		const patient = await this.repository.findOnePatient(id);
		return patient;
	}

	async createPatient(patient) {
		const newPatient = await this.repository.createPatient(patient);
		return newPatient;
	}

	async deletePatient(id) {
		const deletedPatient = await this.repository.deletePatient(id);
		return deletedPatient;
	}

	async getFamilyMembers(id) {
		const familyMembers = await this.repository.findFamilyMembers(id);
		return familyMembers;
	}

	async getPatientByUserName(userName) {
		const patient = await this.repository.findPatientByUserName(userName);
		return patient;
	}

	async addFamilyMember(id, updates) {
		const familyMembers = await this.repository.addFamilyMember(
			id,
			updates
		);
		return familyMembers;
	}
	async getPrescriptions(patientId) {
		const prescriptions = await this.repository.findAllPrescriptions();
		const filteredPrescriptions = prescriptions.filter(
			(prescription) => prescription.patientId.valueOf() == patientId
		);
		return filteredPrescriptions;
	}

	async getPrescription(patientId, prescriptionId) {
		const prescription = await this.repository.findPrescriptionById(
			prescriptionId,
		);
		if (prescription && prescription.patientId.valueOf() == patientId)
			return prescription;
		return null;
	}

	async addHealthPackage(patientId, healthPackage) {
		const updatedPatient = await this.repository.addHealthPackage(patientId, healthPackage);
		return updatedPatient;
	}

	async viewHealthPackages(patientId) {
		const healthPackages = await this.repository.viewHealthPackages(patientId);
		return healthPackages;
	}

	async cancelHealthPackage(patientId, healthPackageId) {
		const updatedPatient = await this.repository.cancelHealthPackage(patientId, healthPackageId);
		return updatedPatient;
	}

	async getHealthRecords(patientId) {
		const healthRecords = await this.repository.getHealthRecords(patientId);
		return healthRecords;
	}

	async addHealthRecord(patientId, healthRecord) {
		const updatedPatient = await this.repository.addHealthRecord(patientId, healthRecord);
		return updatedPatient;
	}

	async deleteHealthRecord(patientId, recordId) {
		const deletedRecord = await this.repository.deleteHealthRecord(patientId, recordId);
		return deletedRecord;
	}

	async getOneRecord(patientId, recordId) {
		const record = await this.repository.getOneRecord(patientId, recordId);
		return record;
	}

	getPicture(pictureName) {
		return this.repository.getPicture(pictureName);
	}

}

export default PatientService;
