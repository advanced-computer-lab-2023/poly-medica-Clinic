import PrescriptionService from '../service/prescription-service.js';
import { EMPTY_SIZE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js'; 

export const prescription = ( app ) => {
	const service = new PrescriptionService();
    
	app.get('/prescriptions', async (req, res) => {
		try{
			const prescriptions = await service.getAllPrescriptions();
			if (prescriptions.length > EMPTY_SIZE) {
				res.status(OK_STATUS_CODE).json(prescriptions);
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'prescriptions not found' });
			}
		}
		catch(error){
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});

	app.get('/prescription/:id', async (req, res) => {
		try{
			const id = req.params.id;
			if(!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message:'Invalid ID' });
			const prescription = await service.getPrescriptionById(id);
			if (prescription) {
				res.status(OK_STATUS_CODE).json(prescription);
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'prescription not found' });
			}
		}
		catch(error){
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});

};