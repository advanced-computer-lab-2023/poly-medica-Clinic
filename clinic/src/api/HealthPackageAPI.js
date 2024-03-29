import HealthPackageService from '../service/health-package-service.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

export const healthPackage = (app) => {
	const service = new HealthPackageService();

	app.get('/packages', async (req, res) => {
		const allPackages = await service.getAllPackages();
		if (allPackages) {
			res.status(OK_STATUS_CODE).json({ allPackages });
		} else {
			res.status(NOT_FOUND_STATUS_CODE).json({
				message: 'packages not found',
			});
		}
	});

	app.post('/packages', async (req, res) => {
		const newPackage = req.body.newPackage;
		const name = newPackage.name;
		const price = Number(newPackage.price);
		const discountOfDoctor = Number(newPackage.discountOfDoctor);
		const discountOfMedicin = Number(newPackage.discountOfMedicin);
		const discountOfFamily = Number(newPackage.discountOfFamily);

		try {
			const data = await service.createNewPackage(
				name,
				price,
				discountOfDoctor,
				discountOfMedicin,
				discountOfFamily
			);
			if (data) {
				res.status(OK_STATUS_CODE).json({ data });
			} else {
				res.status(NOT_FOUND_STATUS_CODE);
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.patch('/package/:id', async (req, res) => {
		const { selectedEditPackages } = req.body;
		const id = req.params.id;
		if (!isValidMongoId(id))
			return res
				.status(ERROR_STATUS_CODE)
				.json({ message: 'Invalid ID' });
		try {
			const updatedPackage = await service.updatePackage(
				id,
				selectedEditPackages
			);
			res.status(OK_STATUS_CODE).json({ updatedPackage });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/packages/:id', async (req, res) => {
		const id = req.params.id;
		try {
			const deletedPackage = await service.deletePackage(id);
			res.status(OK_STATUS_CODE).json({ deletedPackage });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

};
