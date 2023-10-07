import PrescriptionService from '../service/prescription-service.js';
import { EMPTY_SIZE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const prescription = ( app ) => {
	const service = new PrescriptionService();
    
	app.get('/prescriptions', async (req, res) => {
		const prescriptions = await service.getAllPrescriptions();
		if (prescriptions.length > EMPTY_SIZE) {
			res.status(OK_STATUS_CODE).json(prescriptions);
		} else {
			res.status(NOT_FOUND_STATUS_CODE).json({ message: 'prescriptions not found' });
		}
	});

};