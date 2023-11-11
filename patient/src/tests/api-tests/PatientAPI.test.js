import request from 'supertest';
import app from '../../../app.js';
import { 
	connectDBTest,
	disconnectDBTest
} from '../../utils/testing-utils.js';
import { 
	OK_STATUS_CODE
} from '../../utils/Constants.js';
 

import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';

import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';



describe('GET /patients/:pateintId/wallet', () => {
        
	beforeEach(async () => {
		await connectDBTest();
	});
    
	it('should return the wallet amount of the patient', async () => {
		const patient = generatePatient();
		const patientModel = new PatientModel(patient);
		await patientModel.save();
		const response = await request(app).get(`/patients/${patientModel._id}/wallet`);
		console.log('rerer',response.body);
		expect(response.status).toBe(OK_STATUS_CODE);
	});

	
    
	
    
	afterEach(async () => {
		await disconnectDBTest();
	});
}
);