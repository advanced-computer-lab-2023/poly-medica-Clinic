import AppointmentRepository from '../database/repository/appointment-repository.js';

class AppointmentService {
	constructor() {
		this.repository = new AppointmentRepository();
	}

	async getAppointmentsByUserId(id) {
		return await this.repository.findAppointmentsByUserId(id);
	}
}

export default AppointmentService;
