import DoctorModel from '../models/Doctor.js';

class DoctorRepository{

    async addDoctor(req){
        console.log(req.body);
        const { userData, speciality, hourlyRate, affiliation, educationalBackground } = req.body;
        const user = await DoctorModel.addUser(userData, speciality, hourlyRate, affiliation, educationalBackground);
        return user;
    }
}

export default DoctorRepository;