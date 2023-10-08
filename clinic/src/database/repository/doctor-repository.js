import DoctorModel from '../models/Doctor.js';
import { DOCTOR_PROJECTION } from '../../utils/Constants.js';

class DoctorRepository {
	async findAllDoctors() {
		return await DoctorModel.find().select(DOCTOR_PROJECTION);
	}
	async findDoctorById(id) {
		const doctor = await DoctorModel.findById(id, '-userData.password');
		return doctor;
	}
}

export default DoctorRepository;
