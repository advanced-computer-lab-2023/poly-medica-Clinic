import AppointmentService from '../service/appointment-service.js';
import {
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

export const appointment = (app) => {
	const service = new AppointmentService();
	app.get('/appointments/:id', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			res.status(NOT_FOUND_STATUS_CODE).json({
				message: 'appointments not found',
			});
		}
		try {
			const appointments = await service.getAppointmentsByUserId(id);
			res.status(OK_STATUS_CODE).json(appointments);
			console.log('Appointments = ', appointments);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'appointments not found',
			});
		}
	});
};
