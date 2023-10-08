import DoctorService from '../service/doctor-service.js';
import { NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const doctor = (app) => {
	const service = new DoctorService();
	app.get('/doctors', async (req, res) => {
		try {
			const doctors = await service.getAllDoctors();
			res.status(OK_STATUS_CODE).json(doctors);
		} catch (err) {
			res.status(NOT_FOUND_STATUS_CODE).json({
				message: 'doctors not found',
			});
		}
	});
};
