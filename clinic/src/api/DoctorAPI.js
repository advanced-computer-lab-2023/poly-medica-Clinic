import DoctorService from '../service/doctor-service.js';
import {
	CREATED_STATUS_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

export const doctor = (app) => {
	const service = new DoctorService();

	app.post('/doctors', async (req, res) => {
		try {
			const newDoctor = await service.createDoctor(req.body);
			res
				.status(CREATED_STATUS_CODE)
				.json({ message: 'Doctor created!', newDoctor });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/doctors/:id', async (req, res) => {
		try {
			const role = 'ADMIN'; // to be adjusted later on with the role of the logged in user
			if (role == 'ADMIN') {
				const id = req.params.id;
				const deletedDoctor = await service.deleteDoctor(id);
				if (deletedDoctor)
					res
						.status(OK_STATUS_CODE)
						.json({ message: 'doctor deleted!', deletedDoctor });
				else
					res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ message: 'doctor not found!' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
};
