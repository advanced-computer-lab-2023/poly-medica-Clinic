import PrescriptionService from '../service/prescription-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import { OK_STATUS_CODE, ERROR_STATUS_CODE } from '../utils/Constants.js';
import { generatePrescriptionPDF } from '../utils/CommonUtils.js';

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

	app.get('/prescriptions/:prescriptionId/download', async (req, res) => {
		try {
			const { prescriptionId } = req.params;
			if (!isValidMongoId(prescriptionId)) {
				return res.status(ERROR_STATUS_CODE).json({
					message: 'Prescription ID is invalid',
				});
			}
			const prescription = await service.getPrescriptionById(prescriptionId);
			console.log('prescription' + ' ' + prescription);
			if (!prescription) {
				return res.status(ERROR_STATUS_CODE).json({
					message: 'Prescription not found',
				});
			}

			const date = Date.now();
			await generatePrescriptionPDF(prescription, date);
			const fileName = `prescription-${date}-${prescription._id}.pdf`;
			const filePath = service.getFile(fileName);
			console.log('filePath in PATEITN API' + ' ' + filePath);
			res.status(OK_STATUS_CODE).sendFile(filePath);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while downloading prescription',
				error: err.message,
			});
		}
	});
};
