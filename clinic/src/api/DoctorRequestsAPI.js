import DoctorService from '../service/doctor-service.js';
import {
	BAD_REQUEST_CODE_400,
	DOCTOR_ENUM,
	DUPLICATE_KEY_ERROR_CODE,
	ZERO_INDEX,
	EXTRA_INDEX,
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

export const doctorRequests = (app) => {
	const service = new DoctorService();

	app.get('/doctor-requests', async (req, res) => {
		try {
			const doctorRequests = await service.findAllDoctorRequests();
			res.status(OK_STATUS_CODE).json({ doctorRequests });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/doctor-requests', async (req, res) => {
		try {
			const doctorUser = await service.addReqDoctor(req);
			req.body = {
				userId: doctorUser._id,
				email: doctorUser.userData.email,
				password: doctorUser.userData.password,
				userName: doctorUser.userData.userName,
				type: DOCTOR_ENUM,
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
				});
			} else res.status(BAD_REQUEST_CODE_400).send({ errMessage: err.message });
		}
	});

	app.delete('/doctor-requests/:id', async (req, res) => {
		try {
			const id = req.params.id;
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
			const doctorRequest = await service.deleteDoctorRequest(id);
			if (doctorRequest) {
				res.status(OK_STATUS_CODE).json({ message: 'doctor deleted' });
			} else {
				res.status(ERROR_STATUS_CODE).json({
					message: 'doctor not found',
				});
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});
};
