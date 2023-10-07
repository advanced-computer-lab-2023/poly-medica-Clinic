import Doctor  from '../models/Doctor.js';

class DoctorRepository{
	
	async findDoctorById(id){
		const doctor = await Doctor.findById(id, '-userData.password');
		return doctor;
	}
   
}

export default DoctorRepository;