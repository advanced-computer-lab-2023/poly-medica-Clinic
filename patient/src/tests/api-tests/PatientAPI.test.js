import request from 'supertest';
import app from '../../../app.js';
import {
    connectDBTest,
    disconnectDBTest
} from '../../utils/testing-utils.js';
import {
    OK_STATUS_CODE,
    ERROR_STATUS_CODE,
} from '../../utils/Constants.js';
import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';
import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
jest.mock('axios');

describe('GET /patient/:id/health-packages', () => {

    const fetchPackages = async (id) => { return await request(app).get(`/patient/${id}/health-packages`) }

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and retrieve the health packages correctly', async () => {
        const patient = new PatientModel(generatePatient());
        await patient.save();
        const id = patient._id.toString();
        const res = await fetchPackages(id);
        expect(res.status).toBe(OK_STATUS_CODE);
        expect(res._body.patient._id).toBe(patient.id);
    });
_
    it('should return 500 ERROR with the invalid id', async () => {
        const id = faker.database.mongodbObjectId();
        const res = await fetchPackages(id);
        expect(res.status).toBe(ERROR_STATUS_CODE);
    });

    afterEach(async () => {
        await disconnectDBTest();
    });
});
