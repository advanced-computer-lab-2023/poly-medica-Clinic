import request from 'supertest';
import app from '../../../app.js';
import { 
	connectDBTest,
	disconnectDBTest
} from '../../utils/testing-utils.js';
import { 
	OK_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	ERROR_STATUS_CODE
} from '../../utils/Constants.js';
 

import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';
import { faker } from '@faker-js/faker';
 
import { describe, beforeEach, afterEach, expect, it } from '@jest/globals';



describe('GET /patients/:pateintId/wallet', () => {
        
	beforeEach(async () => {
		await connectDBTest();
	});
    
	it('should return 200 OK and retrieve the patient wallet correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save(); 
		const id = patient._id.toString(); 
		const res = await request(app).get(`/patients/${id}/wallet`);
		expect(res.status).toBe(OK_STATUS_CODE);
                
	});

	it('should return 404 NOT FOUND when the patient is not found', async () => {   
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/patients/${id}/wallet`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	}
	);

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/patients/${id}/wallet`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	}
	);
	
    
	
    
	afterEach(async () => {
		await disconnectDBTest();
	});
}
);