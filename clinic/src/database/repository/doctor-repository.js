import DoctorModel from "../models/Doctor.js";

class DoctorRepository {
	async deleteDoctor(id) {
		const deletedDoctor = await DoctorModel.findByIdAndDelete(id);
		return deletedDoctor;
	}
}

export default DoctorRepository;
