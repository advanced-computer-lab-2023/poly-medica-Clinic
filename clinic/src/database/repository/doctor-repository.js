import DoctorModel from '../models/Doctor.js';
import DoctorReqModel from '../models/DoctorReq.js';

class DoctorRepository{

    async addDoctor(req){
        const { userData, speciality, hourlyRate, affiliation, educationalBackground } = req.body;
        const user = await DoctorModel.addUser(userData, speciality, hourlyRate, affiliation, educationalBackground);
        return user;
    }

    async addDoctorReq(req){
        const { userData, speciality, hourlyRate, affiliation, educationalBackground } = req.body;
        const user = await DoctorReqModel.addUser(userData, speciality, hourlyRate, affiliation, educationalBackground);
        return user;
    }
}

export default DoctorRepository;