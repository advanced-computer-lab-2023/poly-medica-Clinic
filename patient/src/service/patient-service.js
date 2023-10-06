import PatientRepository from "../database/repository/Patient-Repository";

class PatientService {
    constructor() {
        this.repository = PatientRepository;

    }

    async getAllPatient(){
        const patients = this.repository.getAllPatient();
        if(patients){
            return patients;
        }else{
            console.log("no data was found");
        }
        
    }
}

export default PatientService;