import DoctorService from '../service/doctor-service.js';
import upload from '../config/MulterConfig.js';
import {
	BAD_REQUEST_CODE_400,
	DOCTOR_ENUM,
	DUPLICATE_KEY_ERROR_CODE,
	ZERO_INDEX,
	EXTRA_INDEX,
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	DOCTOR_FOLDER_NAME,
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

	app.post(
		'/add-doctor-req',
		upload(DOCTOR_FOLDER_NAME).array('file'),
		async (req, res) => {
			try {
				console.log('req.body', req.body);
				const { sendData } = req.body;
				const parsedData = JSON.parse(sendData);
				parsedData.documentsNames = req.files.map((file) => file.filename);
				const doctorUser = await service.addReqDoctor(parsedData);
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
				} else
					res.status(BAD_REQUEST_CODE_400).send({ errMessage: err.message });
			}
		},
	);

	app.get('/doctor-requests/files/:fileName', async (req, res) => {
		try {
			const { fileName } = req.params;
			const filePath = service.getFile(fileName);
			if (filePath) {
				res.status(OK_STATUS_CODE).sendFile(filePath);
			} else {
				res.status(ERROR_STATUS_CODE).json({ message: 'No file found' });
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error.message });
		}
	});

	app.delete('/doctor-requests/:id', async (req, res) => {
		try {
			const { id } = req.params;
			const { accept } = req.query;
			console.log('accept', accept);
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });

			if (accept === 'false') {
				await service
					.getDoctorRequestById(id)
					.then((doctorRequest) => {
						if (!doctorRequest) {
							return res
								.status(ERROR_STATUS_CODE)
								.json({ message: 'Pharmacist request not found' });
						}
						doctorRequest.documentsNames.forEach((fileName) => {
							service.deleteFile(fileName);
						});
					})
					.catch((err) => {
						return res.status(ERROR_STATUS_CODE).json({ message: err.message });
					});
			}

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
