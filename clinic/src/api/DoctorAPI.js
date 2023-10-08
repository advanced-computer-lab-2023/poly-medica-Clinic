import DoctorService from '../service/doctor-service.js';
 
import { PATIENTS_BASE_URL,  NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';
 
//ERROR_STATUS_CODE,
import axios from 'axios';
export const doctor = (app) => {
	const service = new DoctorService();
	app.get('/doctors/:id/patients', async (req, res) => { 
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
		}
    
	});
};

