import AppointmentRepository from '../database/repository/appointment-repository.js';

class AppointmentService {
	constructor() {
		this.repository = new AppointmentRepository();
	}

	async getAppointmentsByUserId(id) {
		return await this.repository.findAppointmentsByUserId(id);
	}

	async createAppointment(appointment) {
		const { patientId, doctorId, patientName, doctorName, date, status, type } = appointment;
		const appointmentModelData = {
			patientId,
			doctorId,
			patientName,
			doctorName,
			date,
			status,
			type,
		};
		const { availableSlotsIdx } = appointment;
		// deletes the available slot from the doctor's availableSlots array
		await this.repository.updateAvailableSlots(doctorId, availableSlotsIdx);
		return await this.repository.createAppointment(appointmentModelData);
	}
}

export default AppointmentService;
