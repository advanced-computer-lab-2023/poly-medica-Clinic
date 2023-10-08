import PatientRepository from '../database/repository/patient-repository.js';

class PatientService {
	constructor() {
		this.repository = new PatientRepository();
	}

	async getAllPatient() {
		const patients = await this.repository.findAllPatients();
		return patients;
	}

	async getFamilyMembers(id) {
		const familyMembers = await this.repository.findFamilyMembers(id);
		return familyMembers;
	}

	async addFamilyMember(id, updates) {
		const familyMembers = await this.repository.addFamilyMember(
			id,
			updates
		);
		return familyMembers;
	}

	async getPrescriptions(patientId){
		const prescriptions = await this.repository.findAllPrescriptions();
		console.log(patientId, typeof patientId);
		const filteredPrescriptions =  prescriptions.filter( prescription => 
			prescription.patientId.valueOf() == patientId 
		);
		return filteredPrescriptions;
	}

	async getPrescription(patientId, prescriptionId){
		const prescription = await this.repository.findPrescriptionById(prescriptionId);
		if(prescription && prescription.patientId.valueOf() == patientId)
			return prescription;
		return null;
	}
}

export default PatientService;
