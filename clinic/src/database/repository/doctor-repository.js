import DoctorModel from '../models/Doctor.js';
import AppointmentModel from '../models/Appointment.js';
 
class DoctorRepository {
	constructor() {
		this.model = DoctorModel;
	}



	async findAllPatients(id) {
		//console.log(id);
		//doctorId is of type ObjectId nad id is of type string
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

 
}

export default DoctorRepository;
