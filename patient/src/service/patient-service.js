import PatientRepository from "../database/repository/patient-repository.js";

class PatientService {
    constructor() {
        this.repository = new PatientRepository();

    }

    async getAllPatient() {
        const patients = await this.repository.findAllPatients();
        return patients;

    }

    async signupUser(req) {
        const user = await this.repository.signupUser(req);
        return user;
    }
}

export default PatientService;