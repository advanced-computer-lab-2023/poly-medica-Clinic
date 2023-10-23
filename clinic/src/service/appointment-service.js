import AppointmentRepository from '../database/repository/appointment-repository.js';

class AppointmentService {
	constructor() {
		this.repository = new AppointmentRepository();
	}

	async getAppointmentsByUserId(id) {
		return await this.repository.findAppointmentsByUserId(id);
	}

	async createAppointment(appointment) {
		return await this.repository.createAppointment(appointment);
	}
}

export default AppointmentService;
