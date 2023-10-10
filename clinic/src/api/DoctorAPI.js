import axios from 'axios';
import DoctorService from '../service/doctor-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import {
	EMPTY_SIZE,
	PATIENTS_BASE_URL,
	NOT_FOUND_STATUS_CODE,
	ERROR_STATUS_CODE,
	OK_STATUS_CODE,
	CREATED_STATUS_CODE,
	UNAUTHORIZED_STATUS_CODE,
} from '../utils/Constants.js';

export const doctor = (app) => {
	const service = new DoctorService();

	app.get('/doctors/:id/patients', async (req, res) => {
		const id = req.params.id;
		if (!isValidMongoId(id))
			return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
		let patientsWithDoctor = await service.findAllPatients(id);
		const getPatientsURL = `${PATIENTS_BASE_URL}/patients`;
		const allPatients = await axios.get(getPatientsURL);

		if (patientsWithDoctor) {
			patientsWithDoctor = patientsWithDoctor.map((patient) =>
				patient.toString(),
			);
			const finalListOFPatients = allPatients.data.patients.filter((patient) =>
				patientsWithDoctor.includes(patient._id),
			);
			res.status(OK_STATUS_CODE).json({ finalListOFPatients });
		} else {
			res.status(NOT_FOUND_STATUS_CODE).json({ message: 'patients not found' });
		}
	});
	app.get('/doctor/:id', async (req, res) => {
		try {
			const id = req.params.id;
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
			const doctor = await service.getDoctorById(id);
			if (doctor) {
				res.status(OK_STATUS_CODE).json({ doctor });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'doctor not found',
				});
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});

	app.get('/doctors', async (req, res) => {
		try {
			const doctors = await service.findAllDoctors();
			res.status(OK_STATUS_CODE).json(doctors);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'doctors not found',
			});
		}
	});

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
				if (!isValidMongoId(id))
					return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
				const deletedDoctor = await service.deleteDoctor(id);
				if (deletedDoctor)
					res
						.status(OK_STATUS_CODE)
						.json({ message: 'doctor deleted!', deletedDoctor });
				else
					res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ message: 'doctor not found!' });
			} else {
				res
					.status(UNAUTHORIZED_STATUS_CODE)
					.json({ message: 'You are not authorized to delete a doctor!' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/patients', async (req, res) => {
		try {
			const getPatientsURL = `${PATIENTS_BASE_URL}/patients`;
			let allPatients = await axios.get(getPatientsURL);
			allPatients = allPatients.data.patients;
			if (allPatients.length > EMPTY_SIZE) {
				res.status(OK_STATUS_CODE).json( { allPatients } );
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'patient not found',
				});
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});

	app.get('/appointments', async (req, res) => {
		try {
			const allAppointments = await service.getAllAppointments();
			if (allAppointments.length > EMPTY_SIZE) {
				res.status(OK_STATUS_CODE).json({ allAppointments });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'appointments not found',
				});
			}
 
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	}
	);
	app.patch('/doctors/:id', async (req, res) => {
		try {
			const id = req.params.id;
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
			const doctor = await service.getDoctorById(id);
			if (doctor) {
				const updatedDoctor = await service.updateDoctor(id, req.body);
				res.status(OK_STATUS_CODE).json({ updatedDoctor });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'doctor not found',
				});
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	}

	);
};

