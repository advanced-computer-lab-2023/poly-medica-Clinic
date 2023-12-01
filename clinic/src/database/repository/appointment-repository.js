import AppointmentModel from '../models/Appointment.js';

class AppointmentRepository {
	async findAppointmentById(appointmentId) {
		const appointment = await AppointmentModel.findById(appointmentId);
		return appointment;
	}
	async findAppointmentsByUserId(id) {
		const appointments = await AppointmentModel.find({});
		return appointments.filter(
			(appointment) =>
				appointment.patientId.toString() === id.toString() ||
                appointment.doctorId.toString() === id.toString()
		);
	}

	async createAppointment(appointment) {
		const newAppointment = new AppointmentModel(appointment);
		return await newAppointment.save();
	}
	
	async updateAppointmentDateAndStatus(appointmentId, newDate){
		const appointment = await AppointmentModel.findById(appointmentId);
		appointment.date = newDate;
		appointment.status = 'Rescheduled';
		return await appointment.save();
	}
}

export default AppointmentRepository;
