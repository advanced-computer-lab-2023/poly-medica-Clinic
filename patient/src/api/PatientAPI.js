import PatientService from '../service/patient-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import upload from '../config/multerConfig.js';
import {
	EMPTY_SIZE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	DUPLICATE_KEY_ERROR_CODE,
	BAD_REQUEST_CODE_400,
	PATIENT_ENUM,
	PATIENT_FOLDER_NAME,
	ZERO_INDEX,
	INF
} from '../utils/Constants.js';

import { calcAge } from '../utils/Patient-utils.js';

export const patient = (app) => {
	const service = new PatientService();

	app.get('/patients', async (req, res) => {
		try {
			const patients = await service.findAllPatients();
			if (patients.length > EMPTY_SIZE) {
				res.status(OK_STATUS_CODE).json({ patients });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'No patients found!',
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/patients/:id', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			return res
				.status(ERROR_STATUS_CODE)
				.json({ message: 'Invalid ID' });
		}
		try {
			const patient = await service.getPatientById(id);
			if (patient) {
				res.status(OK_STATUS_CODE).json({ patient });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'patient not found!',
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/patients', async (req, res) => {
		try {
			const newPatient = await service.createPatient(req.body);
			res.status(OK_STATUS_CODE).json({
				message: 'Patient created!',
				newPatient,
			});
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/patients/:id', async (req, res) => {
		try {
			const id = req.params.id;
			if (!isValidMongoId(id)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'Invalid ID' });
			}
			const deletedPatient = await service.deletePatient(id);
			if (deletedPatient === null)
				res.json({
					message: 'patient not found!',
					status: NOT_FOUND_STATUS_CODE,
				});
			else
				res.json({
					message: 'patient deleted!',
					status: OK_STATUS_CODE,
					deleted_patient: deletedPatient,
				});
		} catch (err) {
			res.json({ err: err.message, status: ERROR_STATUS_CODE });
		}
	});

	app.get('/family-members/:id', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			return res
				.status(ERROR_STATUS_CODE)
				.json({ message: 'Invalid ID' });
		}
		try {
			const data = await service.getFamilyMembers(id);
			if (data) {
				res.status(OK_STATUS_CODE).json(data);
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'family members not found',
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'family members not found',
			});
		}
	});

	app.patch('/family-members/:id', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'Invalid ID',
			});
		}
		try {
			const { member } = req.body;
			if (member.email || member.mobileNumber) {
				const patient = await service.getPatient(member);
				if (!patient) {
					res.status(NOT_FOUND_STATUS_CODE).json({
						message: 'family member is not registered',
					});
				}
				member.id = patient._id;
				member.name = patient.name;
				member.gender = patient.gender;
				member.age = calcAge(patient.dateOfBirth);
				member.nationalId = Math.ceil(parseInt(patient._id, 16) / INF);
			}
			const data = await service.getFamilyMembers(id);
			const newFamilyMem = [member, ...data.familyMembers];
			const newData = await service.addFamilyMember(id, newFamilyMem);
			res.status(OK_STATUS_CODE).json(newData);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: err.message,
			});
			console.log(err.message);
		}
	});

	app.get('/patient/:id/prescriptions', async (req, res) => {
		const { id } = req.params;
		if (!isValidMongoId(id)) {
			return res
				.status(ERROR_STATUS_CODE)
				.json({ message: 'Patient ID is invalid' });
		}
		try {
			const data = await service.getPrescriptions(id);
			if (data && data.length > EMPTY_SIZE)
				res.status(OK_STATUS_CODE).json(data);
			else
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'prescriptions not found',
				});
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while fetching prescriptions',
			});
		}
	});

	app.get(
		'/patient/:pateintId/prescription/:prescriptionId',
		async (req, res) => {
			const { pateintId, prescriptionId } = req.params;
			if (!isValidMongoId(pateintId) || !isValidMongoId(prescriptionId)) {
				return res.status(ERROR_STATUS_CODE).json({
					message: 'Patient ID or Prescription ID is invalid',
				});
			}
			try {
				const data = await service.getPrescription(
					pateintId,
					prescriptionId
				);
				if (data) res.status(OK_STATUS_CODE).json(data);
				else
					res.status(NOT_FOUND_STATUS_CODE).json({
						message: 'prescription not found',
					});
			} catch (err) {
				res.status(ERROR_STATUS_CODE).json({
					message: 'error occurred while fetching prescription',
				});
			}
		}
	);

	app.get('/patient/:id/discount', async (req, res) => {
		try {
			const { id } = req.params;
			const patient = await service.findPatientById(id);
			const patients = await service.findAllPatients();
			let maxDiscount = 0;

			for (let i = 0; i < patients.length; i++) {
				const systemPatient = patients[i];
				for (let j = 0; j < systemPatient.familyMembers.length; j++) {
					const familyMember = systemPatient.familyMembers[j];
					if (
						(familyMember.email && familyMember.email.toString() === patient.email.toString()) ||
						(familyMember.mobileNumber && familyMember.mobileNumber.toString() === patient.mobileNumber.toString())
					) {
						const healthPackage = await service.viewHealthPackages(systemPatient._id);
						if (healthPackage[0]) {
							maxDiscount = Math.max(healthPackage[0].familyDiscount, maxDiscount);
						}
					}
				}
			}

			res.status(OK_STATUS_CODE).json({ maxDiscount: maxDiscount });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
		}
	});


	app.get('/patient/:id/health-packages', async (req, res) => {
		const { id } = req.params;
		try {
			const healthPackages = await service.viewHealthPackages(id);
			res.status(OK_STATUS_CODE).json({ healthPackages });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
			console.log(err.message);
		}
	});

	app.patch('/patient/:id/health-packages', async (req, res) => {
		const { id } = req.params;
		const { healthPackage } = req.body;
		try {
			const data = await service.addHealthPackage(id, healthPackage);
			if (data) res.status(OK_STATUS_CODE).json(data);
			else res.status(NOT_FOUND_STATUS_CODE).json({ message: 'error occured' });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
			console.log(err.message);
		}
	});

	app.patch('/patient/:id/health-packages/:packageId', async (req, res) => {
		const { id, packageId } = req.params;
		try {
			const updatedPatient = await service.cancelHealthPackage(id, packageId);
			if (updatedPatient) res.status(OK_STATUS_CODE).json({ updatedPatient });
			else res.status(NOT_FOUND_STATUS_CODE).json({ message: 'Patient not found' });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
		}
	});

	app.get('/patient/:id/medical-history', async (req, res) => {
		try {
			const { id } = req.params;
			const medicalHistory = await service.getHealthRecords(id);
			res.status(OK_STATUS_CODE).json(medicalHistory);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
		}
	});

	app.patch('/patient/:id/medical-history', upload(PATIENT_FOLDER_NAME).single('image'), async (req, res) => {
		try {
			const { id } = req.params;
			const { title } = req.body;
			console.log('title ======================================= ', title);
			const healthRecord = {};
			healthRecord.recordTitle = title;
			healthRecord.documentName = req.file ? req.file.filename : '';
			const updatedPatient = await service.addHealthRecord(id, healthRecord);
			if (updatedPatient) {
				res.status(OK_STATUS_CODE).json(updatedPatient);
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'patient not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
		}
	});

	app.get('/patient/:id/medical-history/:recordId', async (req, res) => {
		try {
			const { id, recordId } = req.params;
			const healthRecord = await service.getOneRecord(id, recordId);
			const picturePath = service.getPicture(healthRecord.documentName);
			if (picturePath) {
				res.status(OK_STATUS_CODE).sendFile(picturePath);
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'No picture found' });
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error.message });
		}
	});

	app.patch('/patient/:id/medical-history/:recordId', async (req, res) => {
		try {
			const { id, recordId } = req.params;
			const deletedRecord = await service.deleteHealthRecord(id, recordId);
			if (deletedRecord) {
				res.status(OK_STATUS_CODE).json(deletedRecord);
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'record not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
		}
	});

	app.post('/signup', async (req, res) => {
		try {
			const signedupUser = await service.signupUser(req);
			req.body = {
				userId: signedupUser._id,
				email: signedupUser.email,
				password: signedupUser.password,
				userName: signedupUser.userName,
				type: PATIENT_ENUM,
			};
			res.send(req.body);
		} catch (err) {
			if (err.code == DUPLICATE_KEY_ERROR_CODE) {
				const duplicateKeyAttrb = Object.keys(err.keyPattern)[
					ZERO_INDEX
				];
				console.log(duplicateKeyAttrb);
				res.status(BAD_REQUEST_CODE_400).send({
					errCode: DUPLICATE_KEY_ERROR_CODE,
					errMessage: `that ${duplicateKeyAttrb} is already registered`,
				});
			} else
				res.status(BAD_REQUEST_CODE_400).send({
					errMessage: err.message,
				});
		}
	});

	app.get('/address/:pateintId', async (req, res) => {
		const { pateintId } = req.params;
		if (!isValidMongoId(pateintId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'Patient ID is invalid',
			});
		}
		try {
			const data = await service.getAddresses(pateintId);
			if (data) res.status(OK_STATUS_CODE).json(data);
			else
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'addresses not found',
				});
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while fetching addresses',
			});
		}
	});

	app.patch('/address/:pateintId', async (req, res) => {
		const { pateintId } = req.params;
		if (!isValidMongoId(pateintId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'Patient ID is invalid',
			});
		}
		try {
			const { deliveryAddresses } = req.body;
			const data = await service.updateAddress(
				pateintId,
				deliveryAddresses
			);
			if (data) res.status(OK_STATUS_CODE).json(data);
			else
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'addresses not found',
				});
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while updating addresses',
			});
		}
	});

	app.get('/patients/:pateintId/wallet', async (req, res) => {
		const { pateintId } = req.params;
		if (!isValidMongoId(pateintId)) {
			return res
				.status(ERROR_STATUS_CODE)
				.json({ message: 'Patient ID is invalid' });
		}
		try {
			const id = req.params.pateintId;
			const user = await service.getPatientById(id);
			if (user) {
				const walletAmount = await service.getWalletAmount(id);
				res.status(OK_STATUS_CODE).json({ walletAmount });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'Not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	}
	);
};
