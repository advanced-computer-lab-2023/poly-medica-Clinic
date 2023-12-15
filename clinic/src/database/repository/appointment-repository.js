import AppointmentModel from '../models/Appointment.js';

class AppointmentRepository {
	async findAppointmentById(appointmentId) {
		const appointment = await AppointmentModel.findById(appointmentId);
		return appointment;
	}
	
	async findAppointmentsByUserId(id) {
		const appointments = await AppointmentModel.find({});
		return appointments.filter(
			(appointment) => {
				if(appointment.followUpData.isValid && 
					(!appointment.followUpData.handled || !appointment.followUpData.accepted)){
					return false;
				}
				return (
					appointment.patientId.toString() === id.toString()
					||
					appointment.doctorId.toString() === id.toString()
				);
			}
		);
	}

	async createAppointment(appointment) {
		const newAppointment = new AppointmentModel(appointment);
		return await newAppointment.save();
	}
	
	async updateAppointmentDate(appointmentId, newDate){
		const appointment = await AppointmentModel.findById(appointmentId);
		appointment.date = newDate;
		return await appointment.save();
	}

	async updateAppointmentStatus(appointmentId, newStatus){
		const appointment = await AppointmentModel.findById(appointmentId);
		appointment.status = newStatus;
		return await appointment.save();
	}

	async completeAppointment(appointmentId) {
		const appointment = await AppointmentModel.findById(appointmentId);
		appointment.status = 'Complete';
		return await appointment.save();
	}

	async getFollowUpRequests(id){
		const appointments = await AppointmentModel.find({});
		return appointments.filter(
			(appointment) => {
				if((appointment.doctorId.toString() === id.toString() ||
					appointment.patientId.toString() === id.toString()) &&
					appointment.followUpData.isValid){
					return true;
				}
				return false;
			}
		);
	}

	async handleFollowUpRequest(appointmentId, accepted){
		const appointment = await AppointmentModel.findById(appointmentId);
		appointment.followUpData.handled = true;
		appointment.followUpData.accepted = accepted;
		return await appointment.save();
	}
}

export default AppointmentRepository;
