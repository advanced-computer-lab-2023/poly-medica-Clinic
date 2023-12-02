import axios from 'axios';
import AppointmentService from '../service/appointment-service.js';
import DoctorService from '../service/doctor-service.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	PATIENTS_BASE_URL,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

export const appointment = (app) => {
	const service = new AppointmentService();
	const doctorService = new DoctorService();
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

	app.patch('/appointments/reschedule/:appointmentId', async (req, res) => { 
		const { appointmentId } = req.params;
		if (!isValidMongoId(appointmentId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'invalid id',
			});
		}
		const { doctorId, availableSlotsIdx } = req.body;
		// assumption:
		// the endpoint is called with doctorId = appointments[appointmentId].doctorId
		try{
			const updatedAppointment = await service.rescheduleAppointment(appointmentId, doctorId, availableSlotsIdx);
			res.status(OK_STATUS_CODE).json(updatedAppointment);
		}
		catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'appointment not updated due to an error',
			});
			console.log(err.message);
		}
	});

	app.patch('/appointments/cancel/:appointmentId', async (req, res) => { 
		const { appointmentId } = req.params;
		if (!isValidMongoId(appointmentId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'invalid id',
			});
		}
		try{
			const { 
				doctorId,
				appointmentDate,
				refund, // boolean value indicating whether the patient should be refunded or not
			} = req.body;
			const updatedAppointment = await service.cancelAppointment(appointmentId, doctorId, appointmentDate);
			if(refund){
				const {
					patientId,
					pricePaidByPatient,
					pricePaidToDoctor,
				} = req.body;
				// deduct the pricePaidToDoctor from the doctor's wallet
				await doctorService.updateWallet(doctorId, -pricePaidToDoctor);
				
				// add the pricePaidByPatient to the patient's wallet
				await axios.patch(`${PATIENTS_BASE_URL}/patients/${patientId}/wallet`, {
					walletChange: pricePaidByPatient,
				});
			}
			res.status(OK_STATUS_CODE).json(updatedAppointment);
		}
		catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'appointment not cancelled due to an error',
			});
			console.log(err.message);
		}
	});
	
};
