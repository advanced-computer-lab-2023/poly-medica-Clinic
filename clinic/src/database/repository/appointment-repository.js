import AppointmentModel from '../models/Appointment.js';

class AppointmentRepository {
	async findAppointmentsByUserId(id) {
		return await AppointmentModel.find({
			$or: [{ patientId: id }, { doctorId: id }],
		});
	}
}

export default AppointmentRepository;
