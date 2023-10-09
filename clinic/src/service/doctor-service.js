import DoctorRepository from '../database/repository/doctor-repository.js';

class DoctorService{
    constructor() {
        this.repository = new DoctorRepository();

    }

    async addDoctor(req){
        const doctorUser = await this.repository.addDoctor(req);
        return doctorUser;
    }

    async addReqDoctor(req){
        const doctorUser = await this.repository.addDoctorReq(req);
        return doctorUser;
    }
}

export default DoctorService;