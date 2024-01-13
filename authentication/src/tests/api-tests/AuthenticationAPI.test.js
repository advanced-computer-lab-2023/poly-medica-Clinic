import request from 'supertest';
import app from '../../../app.js';
import {
    connectDBTest,
    disconnectDBTest
} from '../../utils/TestingUtils.js';
import User from '../../database/models/Users.js';
import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import generateUser from '../model-generators/generateUser.js';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { PHARMACY_ADMIN_ENUM, DOCTOR_ENUM, PATIENT_ENUM, PHARMACIST_ENUM, CLINIC_REQ, PHARMACY_REQ, OK_REQUEST_CODE_200, BAD_REQUEST_CODE_400, DUB_EMAIL_ERROR_MESSAGE, DUB_USERNAME_ERROR_MESSAGE, INCORRECT_USER_ERROR_MESSAGE, INCORRECT_PASSWORD_ERROR_MESSAGE } from '../../utils/Constants.js';
jest.mock('axios');
import bcrypt from 'bcrypt'
describe('POST /signup/:request', () => {

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK when posting a new patient', async () => {
        const userId = faker.database.mongodbObjectId();
        let oldDatabaseRecord = await User.find();
        const axiosResponseClinicReq = {
            data: null
        };
        const axiosResponsePostPatient = {
            data: {
                userId, email: faker.internet.email(), password: faker.internet.password(), userName: faker.internet.userName(), type: PATIENT_ENUM
            }
        };
        axios.post.mockResolvedValue(axiosResponseClinicReq);
        axios.post.mockResolvedValue(axiosResponsePostPatient);
        const res = await request(app).post(`/signup/${CLINIC_REQ}`).send({ type: PATIENT_ENUM, email: faker.internet.email(), userName: faker.internet.userName() });
        let newDatabaseRecord = await User.find();
        expect(res.status).toBe(OK_REQUEST_CODE_200);
        expect(newDatabaseRecord.length).toBe(oldDatabaseRecord.length + 1);
    });

    it('should return 400 for dub users', async () => {
        const userId = faker.database.mongodbObjectId();
        const email = faker.internet.email();
        const userName = faker.internet.userName();
        const user = new User(generateUser(userId, email, userName, PATIENT_ENUM));
        await user.save();
        const res = await request(app).post(`/signup/${CLINIC_REQ}`).send({ type: PATIENT_ENUM, email: email, userName: userName });
        expect(res.status).toBe(BAD_REQUEST_CODE_400);
        expect(JSON.parse(res.text).message).toBe(DUB_EMAIL_ERROR_MESSAGE);
    });

    afterEach(async () => {
        await disconnectDBTest();
    })
})


describe('DELETE /users/:id', () => {

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 and delete the user', async () => {
        const userId = faker.database.mongodbObjectId();
        const email = faker.internet.email();
        const userName = faker.internet.userName();
        const user = new User(generateUser(userId, email, userName, PATIENT_ENUM));
        await user.save();
        let oldDataBaseRecord = await User.find();
        const res = await request(app).delete(`/users/${userId}`);
        let newDataBaseRecord = await User.find();
        expect(newDataBaseRecord.length).toBe(oldDataBaseRecord.length - 1);
    });

    it('should return 200 and do not delete any user', async () => {
        const userId = faker.database.mongodbObjectId();
        const secondUserId = faker.database.mongodbObjectId();
        const email = faker.internet.email();
        const userName = faker.internet.userName();
        const user = new User(generateUser(userId, email, userName, PATIENT_ENUM));
        await user.save();
        let oldDataBaseRecord = await User.find();
        const res = await request(app).delete(`/users/${secondUserId.toString()}`);
        let newDataBaseRecord = await User.find();
        expect(newDataBaseRecord.length).toBe(oldDataBaseRecord.length);
    });

    afterEach(async () => {
        await disconnectDBTest();
    })

})

describe('POST /doctors', () => {

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 and add a doctor', async () => {
        let oldDatabaseRecord = await User.find();
        const userId = faker.database.mongodbObjectId();
        const userName = faker.internet.userName();
        const res = await request(app).post(`/doctors`).send({ userId: userId, type: DOCTOR_ENUM, email: faker.internet.email(), userName: userName, password: faker.internet.password() });
        let databaseRecord = await User.find();
        expect(res.status).toBe(OK_REQUEST_CODE_200);
        expect(databaseRecord.length).toBe(oldDatabaseRecord.length + 1);
        expect(databaseRecord[databaseRecord.length - 1].userName).toBe(userName);
    });

    afterEach(async () => {
        await disconnectDBTest();
    })

})

describe('POST /pharmacists', () => {

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 and add a pharmacists', async () => {
        let oldDatabaseRecord = await User.find();
        const userId = faker.database.mongodbObjectId();
        const userName = faker.internet.userName();
        const res = await request(app).post(`/pharmacists`).send({ userId: userId, type: PHARMACIST_ENUM, email: faker.internet.email(), userName: userName, password: faker.internet.password() });
        let databaseRecord = await User.find();
        expect(res.status).toBe(OK_REQUEST_CODE_200);
        expect(databaseRecord.length).toBe(oldDatabaseRecord.length + 1);
        expect(databaseRecord[databaseRecord.length - 1].userName).toBe(userName);
    });

    afterEach(async () => {
        await disconnectDBTest();
    })

})

describe('POST /admins/:request', () => {

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 and add a pharmacy admin', async () => {
        const userId = faker.database.mongodbObjectId();
        const userName = faker.internet.userName();
        const oldDatabaseRecord = await User.find();
        const type = PHARMACY_ADMIN_ENUM;
        const axiosResponseCheckDoctorPharma = {
            data: null
        };
        const axiosResponsePostPharmacyReq = {

            data: {
                userId: userId, email: faker.internet.email(), password: faker.internet.password(), userName: userName, type: type
            }
        };
        axios.post.mockResolvedValue(axiosResponseCheckDoctorPharma);
        axios.post.mockResolvedValue(axiosResponseCheckDoctorPharma);
        axios.post.mockResolvedValue(axiosResponsePostPharmacyReq);
        const res = await request(app).post(`/admins/${PHARMACY_REQ}`).send({ userId: userId, type: type, email: faker.internet.email(), userName: userName, password: faker.internet.password() });
        const databaseRecord = await User.find();
        expect(res.status).toBe(OK_REQUEST_CODE_200);
        expect(databaseRecord.length).toBe(oldDatabaseRecord.length + 1);
        expect(databaseRecord[databaseRecord.length - 1].type).toBe(type);
    });

    it('should return 400 and dub userName message', async () => {
        const userId = faker.database.mongodbObjectId();
        const userName = faker.internet.userName();
        const type = PHARMACY_ADMIN_ENUM;
        const email = faker.internet.email();

        // const userId = faker.database.mongodbObjectId();
        // const userName = faker.internet.userName();
        const user = new User(generateUser(userId, email, userName, type));
        await user.save();
        const res = await request(app).post(`/admins/${PHARMACY_REQ}`).send({ userId: userId, type: type, email: email, userName: userName, password: faker.internet.password() });
        expect(res.status).toBe(BAD_REQUEST_CODE_400);
        expect(JSON.parse(res.text).message).toBe(DUB_USERNAME_ERROR_MESSAGE);
    });

    afterEach(async () => {
        await disconnectDBTest();
    })

})

describe('POST /login/:request', () => {

    beforeEach(async () => {
        await connectDBTest();

    });

    it('should return 400 and incorrect UserName', async () => {
        const userId = faker.database.mongodbObjectId();
        const email = faker.internet.email();
        const userName = faker.internet.userName();
        const wrongUserName = faker.internet.userName();
        const password = faker.internet.password();
        const salt = await bcrypt.genSalt();
        const HashedPassword = await bcrypt.hash(password, salt);
        const user = new User(generateUser(userId, email, userName, PATIENT_ENUM, HashedPassword));
        await user.save();
        const res = await request(app).post(`/login/${CLINIC_REQ}`).send({ wrongUserName, password });
        expect(res.status).toBe(BAD_REQUEST_CODE_400);
        expect(JSON.parse(res.text).message).toBe(INCORRECT_USER_ERROR_MESSAGE);
    });

    it('should return 400 and incorrect Password', async () => {
        const userId = faker.database.mongodbObjectId();
        const email = faker.internet.email();
        const userName = faker.internet.userName();
        const password = faker.internet.password();
        const wrongPassword = faker.internet.password();
        const salt = await bcrypt.genSalt();
        const HashedPassword = await bcrypt.hash(password, salt);
        const user = new User(generateUser(userId, email, userName, PATIENT_ENUM, HashedPassword));
        await user.save();
        const res = await request(app).post(`/login/${CLINIC_REQ}`).send({ userName, wrongPassword });
        expect(res.status).toBe(BAD_REQUEST_CODE_400);
        expect(JSON.parse(res.text).message).toBe(INCORRECT_PASSWORD_ERROR_MESSAGE);
    });

    afterEach(async () => {
        await disconnectDBTest();
    })

})
