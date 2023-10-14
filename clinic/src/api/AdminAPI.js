import axios from 'axios';
import AdminService from '../service/admin-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
	PATIENTS_BASE_URL,
	ADMIN_ENUM,
	BAD_REQUEST_CODE_400,
	DUPLICATE_KEY_ERROR_CODE,
	ZERO_INDEX,
	EXTRA_INDEX,
	AUTH_BASE_URL,
} from '../utils/Constants.js';

export const admin = (app) => {
	const service = new AdminService();

	app.post('/admins', async (req, res) => {
		try {
			const adminUser = await service.addAdmin(req);
			req.body = {
				userId: adminUser._id,
				password: adminUser.password,
				userName: adminUser.userName,
				type: ADMIN_ENUM,
			};
			res.send(req.body);
		} catch (err) {
			if (err.code == DUPLICATE_KEY_ERROR_CODE) {
				const duplicateKeyAttrb = Object.keys(err.keyPattern)[ZERO_INDEX];
				const keyAttrb = duplicateKeyAttrb.split('.');
				res.status(BAD_REQUEST_CODE_400).send({
					errCode: DUPLICATE_KEY_ERROR_CODE,
					errMessage: `that ${
						keyAttrb[keyAttrb.length - EXTRA_INDEX]
					} is already registered`,
					errStatus: BAD_REQUEST_CODE_400,
				});
			} else res.status(BAD_REQUEST_CODE_400).send({ errMessage: err.message });
		}
	});

	app.get('/admins', async (req, res) => {
		try {
			const admins = await service.findAllAdmins();
			res.status(OK_STATUS_CODE).json({ admins });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/admins/:id', async (req, res) => {
		try {
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
					axios.delete(`${AUTH_BASE_URL}/users/${id}`);
					res
						.status(OK_STATUS_CODE)
						.json({ message: 'admin deleted!', deletedAdmin });
				} else {
					res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ message: 'admin not found!' });
				}
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/patients/:id', async (req, res) => {
		try {
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
				axios.delete(`${AUTH_BASE_URL}/users/${id}`);
				res.status(OK_STATUS_CODE).send({
					message: 'patient deleted!',
					status: OK_STATUS_CODE,
					deletePatient: response.data.deleted_patient,
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).send(err);
		}
	});
};
