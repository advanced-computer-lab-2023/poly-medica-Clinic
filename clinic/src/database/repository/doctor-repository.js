import DoctorModel from '../models/Doctor.js';

class DoctorRepository {
	async createDoctor(doctor) {
		const newDoctor = await DoctorModel.create(doctor);
		return newDoctor;
	}

	async deleteDoctor(id) {
		const deletedDoctor = await DoctorModel.findByIdAndDelete(id);
		return deletedDoctor;
	}
}

export default DoctorRepository;
