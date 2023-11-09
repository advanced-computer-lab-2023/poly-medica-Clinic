import request from 'supertest';
import app from '../../../app.js';
import {
    connectDBTest,
    disconnectDBTest
} from '../../utils/testing-utils.js';
import {
    OK_STATUS_CODE,
    ERROR_STATUS_CODE,
    HEALTH_PACKAGE_STATUS,
} from '../../utils/Constants.js';
import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';
import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');

describe('GET /patient/:id/health-packages', () => {

    const fetchPackages = async (id) => { return await request(app).get(`/patient/${id}/health-packages`) }

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and retrieve the health packages correctly', async () => {
        const healthPackages = [];
        const numHealthPackages = 5;
        for (let i = 0; i < numHealthPackages; i++) {
            const healthPackage = {
                packageId: faker.database.mongodbObjectId(),
                status: faker.helpers.arrayElement(HEALTH_PACKAGE_STATUS)
            };
            healthPackages.push(healthPackage);
        }

        const patient = new PatientModel(generatePatient());
        const selectedHealthPackage = healthPackages[0];
        patient.healthPackages.push(selectedHealthPackage);
        await patient.save();

        const id = patient._id;

        const axiosResponse = {
            data: {
                allPackages: healthPackages.map((healthPackage) => {
                    return {
                        _id: healthPackage.packageId,
                        status: healthPackage.status,
                    };
                }),
            },
        };

        axios.get.mockResolvedValue(axiosResponse);

        const res = await fetchPackages(id);

        expect(res.status).toBe(OK_STATUS_CODE);
        console.log(res._body);
        expect(res._body.healthPackages.length).toBe(1);
    });


    it('should return 500 ERROR with the invalid id', async () => {
        const id = faker.database.mongodbObjectId();
        const res = await fetchPackages(id);
        expect(res.status).toBe(ERROR_STATUS_CODE);
    });

    afterEach(async () => {

        await disconnectDBTest();
    });
});

describe('PATCH /patient/:id/health-packages', () => {

    const addPackage = async (id, healthPackage) => { return await request(app).patch(`/patient/${id}/health-packages`).send(healthPackage); };

    const healthPackage = {
        packageId: '11111111111111111111',
        renewalDate: '12/04/2023',
        status: 'Cancelled'
    }

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and add the health packages correctly', async () => {
        let patient = new PatientModel(generatePatient());
        await patient.save();
        const id = patient._id;
        const res = await addPackage(id, healthPackage);
        expect(res.status).toBe(OK_STATUS_CODE);
        patient = await PatientModel.findById(id);
        expect(patient.healthPackages.length).toBe(1);
    });

    it('should return 500 ERROR with the invalid id', async () => {
        const id = faker.database.mongodbObjectId();
        const res = await addPackage(id, healthPackage);
        expect(res.status).toBe(ERROR_STATUS_CODE);
    });

    afterEach(async () => {

        await disconnectDBTest();
    });
});

describe('PATCH /patient/:id/health-packages/:packageId', () => {

    const removePackage = async (id, packageId) => { return await request(app).patch(`/patient/${id}/health-packages/${packageId}`); };

    const healthPackage = {
        packageId: faker.database.mongodbObjectId(),
        renewalDate: '12/04/2023',
        status: HEALTH_PACKAGE_STATUS[1]
    }

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and remove the health packages correctly', async () => {
        let patient = new PatientModel(generatePatient());
        patient.healthPackages.push(healthPackage);
        await patient.save();
        const id = patient._id;
        const res = await removePackage(id, healthPackage.packageId);
        expect(res.status).toBe(OK_STATUS_CODE);
        patient = await PatientModel.findById(id);
        expect(patient.healthPackages[0].status).toBe(HEALTH_PACKAGE_STATUS[0]);
    });

    it('should return 500 ERROR with the invalid id', async () => {
        const id = faker.database.mongodbObjectId();
        const res = await removePackage(id, healthPackage.packageId);
        expect(res.status).toBe(ERROR_STATUS_CODE);
    });

    afterEach(async () => {

        await disconnectDBTest();
    });
});

describe('GET /patient/:id/medical-history', () => {

    const fetchMedicalHistory = async (id) => { return await request(app).get(`/patient/${id}/medical-history`) }

    const healthRecord = {
        recordTitle: 'test record',
        documentName: 'testDocument.pdf',
        _id: faker.database.mongodbObjectId()
    }

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and retrieve the medical history correctly', async () => {
        const patient = new PatientModel(generatePatient());
        patient.healthRecords.push(healthRecord);
        await patient.save();
        const id = patient._id;
        const res = await fetchMedicalHistory(id);
        expect(res.status).toBe(OK_STATUS_CODE);
        console.log(res._body);
        expect(res._body.length).toBe(1);
    });

    it('should return 500 ERROR with the invalid id', async () => {
        const id = faker.database.mongodbObjectId();
        const res = await fetchMedicalHistory(id);
        expect(res.status).toBe(ERROR_STATUS_CODE);
    });

    afterEach(async () => {

        await disconnectDBTest();
    });
});

describe('PATCH /patient/:id/medical-history', () => {

    const addMedicalHistory = async (id) => { return await request(app).patch(`/patient/${id}/medical-history`).send({ title: 'New Record' }) }

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and Add the medical history correctly', async () => {
        let patient = new PatientModel(generatePatient());
        await patient.save();
        const id = patient._id;
        const res = await addMedicalHistory(id);
        expect(res.status).toBe(OK_STATUS_CODE);
        patient = await PatientModel.findById(id);
        expect(patient.healthRecords.length).toBe(1);
    });

    it('should return 500 ERROR with the invalid id', async () => {
        const id = faker.database.mongodbObjectId();
        const res = await addMedicalHistory(id);
        expect(res.status).toBe(ERROR_STATUS_CODE);
    });

    afterEach(async () => {

        await disconnectDBTest();
    });
});

describe('PATCH /patient/:id/medical-history/:recordId', () => {

    const deleteMedicalHistory = async (id, recordId) => { return await request(app).patch(`/patient/${id}/medical-history/${recordId}`) }

    beforeEach(async () => {
        await connectDBTest();
    });

    const healthRecord = {
        recordTitle: 'test record',
        documentName: 'testDocument.pdf',
        _id: faker.database.mongodbObjectId()
    }

    it('should return 200 OK and delete the medical history correctly', async () => {
        let patient = new PatientModel(generatePatient());
        patient.healthRecords.push(healthRecord);
        await patient.save();
        const id = patient._id;
        const res = await deleteMedicalHistory(id, healthRecord._id);
        expect(res.status).toBe(OK_STATUS_CODE);
        patient = await PatientModel.findById(id);
        expect(patient.healthRecords.length).toBe(0);
    });

    it('should return 500 ERROR with the invalid id', async () => {
        const id = faker.database.mongodbObjectId();
        const res = await deleteMedicalHistory(id, healthRecord._id);
        expect(res.status).toBe(ERROR_STATUS_CODE);
    });

    afterEach(async () => {

        await disconnectDBTest();
    });
});
