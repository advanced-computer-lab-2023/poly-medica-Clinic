import AppointmentModel from '../models/Appointment.js';

class AppointmentRepository {
	async findAppointmentsByUserId(id) {
		// const objectId = mongoose.Types.ObjectId(id)
		// console.log(objectId);
		const appointments = await AppointmentModel.find({});
		return appointments.filter((appointment) => appointment.patientId.toString() === id.toString()
		);
	}
}

export default AppointmentRepository;
