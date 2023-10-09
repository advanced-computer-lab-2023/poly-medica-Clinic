import axios from 'axios';
import AdminService from '../service/admin-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	UNAUTHORIZED_STATUS_CODE,
	OK_STATUS_CODE,
	CREATED_STATUS_CODE,
	PATIENTS_BASE_URL,
} from '../utils/Constants.js';

export const admin = (app) => {
	const service = new AdminService();

	app.get('/admins', async (req, res) => {
		try {
			const admins = await service.findAllAdmins();
			res.status(OK_STATUS_CODE).json({ admins });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/admins', async (req, res) => {
		try {
			const newAdmin = await service.createAdmin(req.body);
			res
				.status(CREATED_STATUS_CODE)
				.json({ message: 'admin created!', newAdmin });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/admins/:id', async (req, res) => {
		try {
			const role = 'ADMIN'; // to be adjusted later on with the role of the logged in user
			if (role == 'ADMIN') {
				const id = req.params.id;
				if (!isValidMongoId(id))
					return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
				const isMainAdmin = await service.checkMainAdmin(id);
				if (isMainAdmin) {
					res
						.status(ERROR_STATUS_CODE)
						.json({ message: 'you can not delete main admin' });
				} else {
					const deletedAdmin = await service.deleteAdmin(id);

					if (deletedAdmin) {
						res
							.status(OK_STATUS_CODE)
							.json({ message: 'admin deleted!', deletedAdmin });
					} else {
						res
							.status(NOT_FOUND_STATUS_CODE)
							.json({ message: 'admin not found!' });
					}
				}
			} else {
				res
					.status(UNAUTHORIZED_STATUS_CODE)
					.json({ message: 'You are not authorized to delete an admin!' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/patients/:id', async (req, res) => {
		try {
			const role = 'ADMIN'; // to be adjusted later on with the role of the logged in user
			if (role == 'ADMIN') {
				const id = req.params.id;
				if (!isValidMongoId(id))
					return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
				const deletePatientURL = `${PATIENTS_BASE_URL}/patients/${id}`;
				const response = await axios.delete(deletePatientURL);

				if (response.data.status == NOT_FOUND_STATUS_CODE) {
					res.status(NOT_FOUND_STATUS_CODE).send({
						message: 'patient not found!',
						status: NOT_FOUND_STATUS_CODE,
					});
				} else if (response.data.status == OK_STATUS_CODE) {
					res.status(OK_STATUS_CODE).send({
						message: 'patient deleted!',
						status: OK_STATUS_CODE,
						deletePatient: response.data.deleted_patient,
					});
				}
			} else {
				res.status(UNAUTHORIZED_STATUS_CODE).send({
					message: 'You are not authorized to delete a patient!',
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).send(err);
		}
	});
};
