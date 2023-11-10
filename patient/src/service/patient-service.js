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
}

export default PatientService;
