import AppointmentModel from '../models/Appointment.js';

class AppointmentRepository {
	async findAppointmentsByUserId(id) {
		const appointments = await AppointmentModel.find({});
		return appointments.filter((appointment) =>
			appointment.patientId.toString() === id.toString() || appointment.doctorId.toString() === id.toString()
		);
	}

	async createAppointment(appointment) {
		const { patientId, doctorId, patientName, doctorName, date, status, type } = appointment;
		const newAppointment = new AppointmentModel({
			patientId,
			doctorId,
			patientName,
			doctorName,
			date,
			status,
			type,
		});
		return await newAppointment.save();
	}
}

export default AppointmentRepository;
