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
}

export default PatientService;
