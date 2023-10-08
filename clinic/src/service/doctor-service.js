import DoctorRepository from '../database/repository/doctor-repository.js';
 
import { EMPTY_SIZE } from '../utils/Constants.js';


class DoctorService{
	constructor() {
		this.repository = new DoctorRepository;
	}

	async getAllPatients(id){
		const allPatients = await  this.repository.findAllPatients(id);
		if (allPatients.length>EMPTY_SIZE) {
			return allPatients; 
		}
		else {
			console.log('no data was found');
		}
	}
 

	async getDoctorById(id) {
		const doctor = await this.repository.findDoctorById(id);
		if (doctor) {
			return doctor;
		} else {
			console.log('no doctor wuth this id was found');
		}
	}

	async getAllDoctors() {
		return await this.repository.findAllDoctors();
 
}

export default DoctorService;
