import DoctorRepository from '../database/repository/doctor-repository.js';

class DoctorService {
	constructor() {
		this.repository = new DoctorRepository();
	}

	async getDoctorById(id){
		const doctor = await this.repository.findDoctorById(id);
		if(doctor){
			return doctor;
		}
		else{
			console.log('no doctor wuth this id was found');
		}
	}
	
}

export default DoctorService;