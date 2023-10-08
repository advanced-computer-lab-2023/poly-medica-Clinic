import DoctorModel from '../models/Doctor.js';
import { DOCTOR_PROJECTION } from '../../utils/Constants.js';
 
import AppointmentModel from '../models/Appointment.js';
 
class DoctorRepository {
	constructor() {
		this.model = DoctorModel;
	}



	async findAllPatients(id) { 
		try{
			let allPatients = await AppointmentModel.find({ }).select('patientId doctorId');
			allPatients = allPatients.filter(appointment => appointment.doctorId.toString() === id ).
				map(appointment => appointment.patientId);
			
		
			return allPatients;
		}
		catch(err){
			console.log(err);
		}
	}

 
 


 
	async findAllDoctors() {
		return await DoctorModel.find().select(DOCTOR_PROJECTION);
	}
	async findDoctorById(id) {
		const doctor = await DoctorModel.findById(id, '-userData.password');
		return doctor;
	}
 
}

export default DoctorRepository;
