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

    async addAddress(id, address) {
        const newAddresses = await this.repository.addPatientAddress(id, address);
        return newAddresses;
    }
}

export default PatientService;
