import PrescriptionService from '../service/prescription-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import { OK_STATUS_CODE, ERROR_STATUS_CODE } from '../utils/Constants.js';

export const prescription = (app) => {
	const service = new PrescriptionService();

	app.post('/prescriptions', async (req, res) => {
		try {
			const { prescription } = req.body;
			const data = await service.addPrescription(prescription);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while adding prescription',
				error: err.message,
			});
		}
	});

	app.patch('/prescriptions/:prescriptionId', async (req, res) => {
		try {
			const { prescriptionId } = req.params;
			if (!isValidMongoId(prescriptionId)) {
				return res.status(ERROR_STATUS_CODE).json({
					message: 'Prescription ID is invalid',
				});
			}
			const { prescription } = req.body;
			const data = await service.updatePrescription(
				prescriptionId,
				prescription,
			);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while updating prescription',
				error: err.message,
			});
		}
	});
};
