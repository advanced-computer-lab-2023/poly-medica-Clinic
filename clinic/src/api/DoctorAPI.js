import DoctorService from '../service/doctor-service.js';

import axios from 'axios';
import { isValidMongoId } from '../utils/Validation.js';
import {
	PATIENTS_BASE_URL,
	NOT_FOUND_STATUS_CODE,
	ERROR_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

export const doctor = (app) => {

	const service = new DoctorService();

	app.get('/doctors/:id/patients', async (req, res) => { 
		try{
			const  id  = req.params.id;
			let patientsWithDoctor = await service.getAllPatients(id); 
			const getPatientsURL = `${PATIENTS_BASE_URL}/patients`;
			const allPatients = await axios.get(getPatientsURL);

			if (patientsWithDoctor) {
				patientsWithDoctor = patientsWithDoctor.map(patient => patient.toString());
				const finalListOFPatients = allPatients.data.filter(patient => 
					patientsWithDoctor.includes(patient._id));
				console.log(finalListOFPatients);
				res.status(OK_STATUS_CODE).json({ finalListOFPatients });

			}
			else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'patients not found' });
			}}
		catch(error){
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});
	app.get('/doctor/:id', async (req, res) => {
		try {
			const id = req.params.id;
			if (!isValidMongoId(id))
				return res
					.status(ERROR_STATUS_CODE)
					.json({ message: 'Invalid ID' });
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
			const doctors = await service.getAllDoctors();
			res.status(OK_STATUS_CODE).json(doctors);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'doctors not found',
			});
		}

	});
	app.get('/doctors/:name', async (req, res) => {
		
		try {
			const name = req.params.name;
			const getPatientsURL = `${PATIENTS_BASE_URL}/patients`;	
			const allPatients = await axios.get(getPatientsURL);
			const patient = allPatients.data.filter(patient => patient.name === name);
			if (patient) {
				res.status(OK_STATUS_CODE).json({ patient });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({
					message: 'patient not found',
				});
			}
 
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});

};