import AppointmentService from '../service/appointment-service.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

export const appointment = (app) => {
	const service = new AppointmentService();
	app.get('/appointments/:id', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'invalid id',
			});
		}
		try {
			const appointments = await service.getAppointmentsByUserId(id);
			res.status(OK_STATUS_CODE).json(appointments);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'appointments not found',
			});
		}
	});
	
	app.post('/appointments', async (req, res) => {
		const appointment = req.body.items;
		try {
			const newAppointment = await service.createAppointment(appointment);
			res.status(OK_STATUS_CODE).json(newAppointment);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'appointment not created due to an error',
			});
			console.log(err.message);
		}
	});

	app.patch('/appointments/complete/:appointmentId', async (req, res) => {
		const { appointmentId } = req.params;
		if (!isValidMongoId(appointmentId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'invalid id',
			});
		}
		try {
			const updatedAppointment = await service.completeAppointment(appointmentId);
			res.status(OK_STATUS_CODE).json(updatedAppointment);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'appointment not completed due to an error',
			});
			console.log(err.message);
		}
	});
};
