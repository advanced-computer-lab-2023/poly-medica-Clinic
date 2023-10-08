import PatientService from '../service/patient-service.js';
import { isValidMongoId } from '../utils/Validation.js';

import {
	EMPTY_SIZE,
	NOT_FOUND_STATUS_CODE,
 
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
 
} from '../utils/Constants.js';
 
export const patient = (app) => {
	const service = new PatientService();


	app.get('/patients', async (req, res) => {
		const allPatients = await service.getAllPatient();
		if (allPatients.length > EMPTY_SIZE) {
			res.status(OK_STATUS_CODE).json(allPatients);
		} else {
			res.status(NOT_FOUND_STATUS_CODE).json({
				message: 'patients not found',
			});
		}
	});

	app.get('/family-members/:id', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			return res
				.status(NOT_FOUND_STATUS_CODE)
				.json({ message: 'family members not found' });
		}
		try {
			const data = await service.getFamilyMembers(id);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(NOT_FOUND_STATUS_CODE).json({
				message: 'family members not found',
			});
		}
	});

	app.patch('/family-members/:id', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			return res.status(NOT_FOUND_STATUS_CODE).json({
				message: 'couldn\'t add a family member, try again later!',
			});
		}
		try {
			const { name, nationalId, age, gender, relation } = req.body;
			const data = await service.getFamilyMembers(id);
			const newFamilyMem = [
				{ name, nationalId, age, gender, relation },
				...data.familyMembers,
			];
			const newData = await service.addFamilyMember(id, newFamilyMem);
			res.status(OK_STATUS_CODE).json(newData);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: err.message,
			});
		}
	});
};
 
