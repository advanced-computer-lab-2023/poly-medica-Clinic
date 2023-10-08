
import HealthPackageService from '../service/health-package-service.js';
import { EMPTY_SIZE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const healthPackage = (app) => {
	const service = new HealthPackageService();

	app.get('/packages', async (req, res) => {
		const allPackages = await service.getAllPackages();
		if (allPackages.length >  EMPTY_SIZE) {
			res.status(OK_STATUS_CODE).json({ allPackages });
		} else {
			res.status(NOT_FOUND_STATUS_CODE).json({ message: 'patients not found' });
		}
	});

	app.post('/packages', async (req, res) => {

		const { name, price, discountOfDoctor, discountOfMedicin, discountOfFamily } = req.body;
		console.log({ name });

		const data = await service.createNewPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily);
		if (data) {
			res.status(OK_STATUS_CODE).json({ data });
		} else {
			res.status(ERROR_STATUS_CODE);
		}
	});

	// app.patch('/edit-package', async (req,res) => {

	// });

	app.delete('/packages/:id', async (req, res) => {
		const id = req.params.id;
		try {
			console.log(id);
			const deletedPackage = await service.deletePackage(id);
			res.status(OK_STATUS_CODE).json({ deletedPackage });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	

};
