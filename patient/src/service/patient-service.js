import PatientRepository from '../database/repository/patient-repository.js';

class PatientService {
	constructor() {
		this.repository = new PatientRepository();
	}

	async signupUser(req) {
		const user = await this.repository.signupUser(req);
		return user;
	}

	async findPatient(patientId) {
		const patient = await this.repository.findPatientById(patientId);
		return patient;
	}

	async findAllPatients() {
		const patients = await this.repository.findAllPatients();
		return patients;
	}

	async getPatientById(patientId) {
		const patient = await this.repository.findPatientById(patientId);
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

	async getPatient(attributes) {
		const patient = await this.repository.findRegeisteredFamilyMember(attributes);
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
			prescriptionId
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

	async getWalletAmount(id) {
		const amount = await this.repository.getWalletAmount(id);
		return amount;
	}
	async getAddresses(id) {
		const addresses = await this.repository.findPatientAddresses(id);
		return addresses;
	}

	async updateAddress(id, address) {
		const updatedAddresses = await this.repository.updatePatientAddress(
			id,
			address
		);
		return updatedAddresses;
	}

	async getOrders(id) {
		const orders = await this.repository.findOrders(id);
		return orders;
	}

	async addOrder(order) {
		const orders = await this.repository.addOrder(order);
		return orders;
	}

	async updateOrder(order) {
		const orders = await this.repository.updateOrder(order);
		return orders;
	}

	async updateWallet(id , walletChange){
		const updatedWalletAmount = await this.repository.updateWalletAmount(id, walletChange);
		return updatedWalletAmount;
	}
}

export default PatientService;
