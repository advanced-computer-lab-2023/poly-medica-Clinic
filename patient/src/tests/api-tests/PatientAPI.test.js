<<<<<<< HEAD
import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
    OK_STATUS_CODE,
    NOT_FOUND_STATUS_CODE,
    ERROR_STATUS_CODE,
    TIME_OUT,
    ZERO_INDEX,
    HEALTH_PACKAGE_STATUS, ONE
} from '../../utils/Constants.js';

import PrescriptionModel from '../../database/models/Prescription.js';
import generatePrescription from '../model-generators/generatePrescription.js';
import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';

import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.setTimeout(TIME_OUT);
jest.mock('axios');

describe('GET /patient/:id/health-packages', () => {

    const fetchPackages = async (id) => { return await request(app).get(`/patient/${id}/health-packages`); };

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and retrieve the health packages correctly', async () => {
        const healthPackages = [];
        const numHealthPackages = 5;
        for (let i = ZERO_INDEX; i < numHealthPackages; i++) {
            const healthPackage = {
                packageId: faker.database.mongodbObjectId(),
                status: faker.helpers.arrayElement(HEALTH_PACKAGE_STATUS)
            };
            healthPackages.push(healthPackage);
        }

        const patient = new PatientModel(generatePatient());
        const selectedHealthPackage = healthPackages[ZERO_INDEX];
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
        expect(res._body.healthPackages.length).toBe(ONE);
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
        packageId: faker.database.mongodbObjectId(),
        renewalDate: faker.date.anytime(),
        status: faker.helpers.arrayElement[HEALTH_PACKAGE_STATUS]
    };

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
        expect(patient.healthPackages.length).toBe(ONE);
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
        status: HEALTH_PACKAGE_STATUS[ONE]
    };

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
        expect(patient.healthPackages[ZERO_INDEX].status).toBe(HEALTH_PACKAGE_STATUS[ZERO_INDEX]);
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

    const fetchMedicalHistory = async (id) => { return await request(app).get(`/patient/${id}/medical-history`); };

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and retrieve the medical history correctly', async () => {
        const patient = new PatientModel(generatePatient());
        await patient.save();
        const recordsNumber = patient.healthRecords.length;
        const id = patient._id;
        const res = await fetchMedicalHistory(id);
        expect(res.status).toBe(OK_STATUS_CODE);
        console.log(res._body);
        expect(res._body.length).toBe(recordsNumber);
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

    const addMedicalHistory = async (id) => { return await request(app).patch(`/patient/${id}/medical-history`).send({ title: 'New Record' }); };

    beforeEach(async () => {
        await connectDBTest();
    });

    it('should return 200 OK and Add the medical history correctly', async () => {
        let patient = new PatientModel(generatePatient());
        await patient.save();
        const oldRecordsNumber = patient.healthRecords.length;
        const id = patient._id;
        const res = await addMedicalHistory(id);
        expect(res.status).toBe(OK_STATUS_CODE);
        patient = await PatientModel.findById(id);
        expect(patient.healthRecords.length).toBe(oldRecordsNumber + ONE);
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

    const deleteMedicalHistory = async (id, recordId) => { return await request(app).patch(`/patient/${id}/medical-history/${recordId}`); };

    beforeEach(async () => {
        await connectDBTest();
    });

    const healthRecord = {
        recordTitle: 'test record',
        documentName: 'testDocument.pdf',
        _id: faker.database.mongodbObjectId()
    };

    it('should return 200 OK and delete the medical history correctly', async () => {
        let patient = new PatientModel(generatePatient());
        patient.healthRecords.push(healthRecord);
        await patient.save();
        const oldRecordsNumber = patient.healthRecords.length;
        const id = patient._id;
        const res = await deleteMedicalHistory(id, healthRecord._id);
        expect(res.status).toBe(OK_STATUS_CODE);
        patient = await PatientModel.findById(id);
        expect(patient.healthRecords.length).toBe(oldRecordsNumber - ONE);
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

describe('GET /patient/:id/prescriptions (get all prescriptions of a patient)', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

    it('should return 200 OK and retrieve all prescriptions correctly', async () => {
        const mainPatientId = faker.database.mongodbObjectId();
        const mainPatientPrescriptions = new Set();
        const cntPrescriptionsMainPatient = faker.number.int({
            min: 2,
            max: 10,
        });
        const cntOtherPrescriptions = faker.number.int({ min: 2, max: 10 });
        for (let i = ZERO_INDEX; i < cntPrescriptionsMainPatient; i++) {
            const doctorId = faker.database.mongodbObjectId();
            const prescription = new PrescriptionModel(
                generatePrescription(mainPatientId, doctorId)
            );
            await prescription.save();
            mainPatientPrescriptions.add(prescription._id.toString());
        }
        for (let i = ZERO_INDEX; i < cntOtherPrescriptions; i++) {
            const patientId = faker.database.mongodbObjectId();
            const doctorId = faker.database.mongodbObjectId();
            const prescription = new PrescriptionModel(
                generatePrescription(patientId, doctorId)
            );
            await prescription.save();
        }
        console.log(mainPatientId);
        const res = await request(app).get(
            `/patient/${mainPatientId}/prescriptions`
        );
        expect(res.status).toBe(OK_STATUS_CODE);

		expect(cntPrescriptionsMainPatient).toBe(res._body.length);
		res._body.forEach((retrievedPrescription) => {
			expect(
				mainPatientPrescriptions.has(retrievedPrescription._id)
			).toBeTruthy();
		});
	});

	it('should return 404 NOT FOUND no prescriptions are found', async () => {
		const patientId = faker.database.mongodbObjectId();
		const res = await request(app).get(
			`/patient/${patientId}/prescriptions`
		);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/patient/${id}/prescriptions`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /patients/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patient._id).toBe(patient.id);
	});

	it('should return 404 NOT FOUND when the patient is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /address/:pateintId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient addresses correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.deliveryAddresses.length).toBe(
			patient.deliveryAddresses.length
		);
	});

	it('should return 404 NOT FOUND when the patient addresses are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({ message: 'addresses not found' });
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /address/:pateintId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the patient addresses correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const deliveryAddresses = generatePatient().deliveryAddresses;
		const id = patient._id.toString();
		const res = await request(app)
			.patch(`/address/${id}`)
			.send({ deliveryAddresses });
		const data = res._body.deliveryAddresses.map((address) => {
			delete address._id;
			return address;
		});
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(data).toEqual(deliveryAddresses);
	});

	it('should return 404 NOT FOUND when the patient addresses are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const deliveryAddresses = generatePatient().deliveryAddresses;
		const res = await request(app)
			.patch(`/address/${id}`)
			.send(deliveryAddresses);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({ message: 'addresses not found' });
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/address/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /family-members/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient family members correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.familyMembers.length).toBe(
			patient.familyMembers.length
		);
	});

	it('should return 404 NOT FOUND when the patient family members are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({
			message: 'family members not found',
		});
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /family-members/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and add registered family member correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const familyMem = new PatientModel(generatePatient());
		await familyMem.save();
		const id = patient._id.toString();
		const res = await request(app)
			.patch(`/family-members/${id}`)
			.send({ member: { email: familyMem.email } });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.familyMembers[ZERO_INDEX].id.toString()).toBe(familyMem._id.toString());
	});

	it('should return 200 OK and add unregistered family member correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();

		const res = await request(app)
			.patch(`/family-members/${id}`)
			.send({ member: {} });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.id).toBeUndefined();
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/family-members/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

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
=======
import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/testing-utils.js';
import {
	OK_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	ERROR_STATUS_CODE,
	TIME_OUT,
	ZERO_INDEX,
	HEALTH_PACKAGE_STATUS, ONE
} from '../../utils/Constants.js';

import PrescriptionModel from '../../database/models/Prescription.js';
import generatePrescription from '../model-generators/generatePrescription.js';
import PatientModel from '../../database/models/Patient.js';
import generatePatient from '../model-generators/generatePatient.js';

import { describe, beforeEach, afterEach, expect, it, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.setTimeout(TIME_OUT);
jest.mock('axios');

describe('GET /patient/:id/health-packages', () => {

	const fetchPackages = async (id) => { return await request(app).get(`/patient/${id}/health-packages`); };

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the health packages correctly', async () => {
		const healthPackages = [];
		const numHealthPackages = 5;
		for (let i = ZERO_INDEX; i < numHealthPackages; i++) {
			const healthPackage = {
				packageId: faker.database.mongodbObjectId(),
				status: faker.helpers.arrayElement(HEALTH_PACKAGE_STATUS)
			};
			healthPackages.push(healthPackage);
		}

		const patient = new PatientModel(generatePatient());
		const selectedHealthPackage = healthPackages[ZERO_INDEX];
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
		expect(res._body.healthPackages.length).toBe(ONE);
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

	const addPackage = async (id, healthPackage) => { return await request(app).patch(`/patient/${id}/health-packages`).send({ items: healthPackage }); };

	const healthPackage = {
		packageId: faker.database.mongodbObjectId(),
		renewalDate: faker.date.anytime(),
		status: faker.helpers.arrayElement[HEALTH_PACKAGE_STATUS]
	};

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
		expect(patient.healthPackages.length).toBe(ONE);
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
		status: HEALTH_PACKAGE_STATUS[ONE]
	};

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
		expect(patient.healthPackages[ZERO_INDEX].status).toBe(HEALTH_PACKAGE_STATUS[ZERO_INDEX]);
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

	const fetchMedicalHistory = async (id) => { return await request(app).get(`/patient/${id}/medical-history`); };

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the medical history correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const recordsNumber = patient.healthRecords.length;
		const id = patient._id;
		const res = await fetchMedicalHistory(id);
		expect(res.status).toBe(OK_STATUS_CODE);
		console.log(res._body);
		expect(res._body.length).toBe(recordsNumber);
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

	const addMedicalHistory = async (id) => { return await request(app).patch(`/patient/${id}/medical-history`).send({ title: 'New Record' }); };

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and Add the medical history correctly', async () => {
		let patient = new PatientModel(generatePatient());
		await patient.save();
		const oldRecordsNumber = patient.healthRecords.length;
		const id = patient._id;
		const res = await addMedicalHistory(id);
		expect(res.status).toBe(OK_STATUS_CODE);
		patient = await PatientModel.findById(id);
		expect(patient.healthRecords.length).toBe(oldRecordsNumber + ONE);
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

	const deleteMedicalHistory = async (id, recordId) => { return await request(app).patch(`/patient/${id}/medical-history/${recordId}`); };

	beforeEach(async () => {
		await connectDBTest();
	});

	const healthRecord = {
		recordTitle: 'test record',
		documentName: 'testDocument.pdf',
		_id: faker.database.mongodbObjectId()
	};

	it('should return 200 OK and delete the medical history correctly', async () => {
		let patient = new PatientModel(generatePatient());
		patient.healthRecords.push(healthRecord);
		await patient.save();
		const oldRecordsNumber = patient.healthRecords.length;
		const id = patient._id;
		const res = await deleteMedicalHistory(id, healthRecord._id);
		expect(res.status).toBe(OK_STATUS_CODE);
		patient = await PatientModel.findById(id);
		expect(patient.healthRecords.length).toBe(oldRecordsNumber - ONE);
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

describe('GET /patient/:id/prescriptions (get all prescriptions of a patient)', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve all prescriptions correctly', async () => {
		const mainPatientId = faker.database.mongodbObjectId();
		const mainPatientPrescriptions = new Set();
		const cntPrescriptionsMainPatient = faker.number.int({
			min: 2,
			max: 10,
		});
		const cntOtherPrescriptions = faker.number.int({ min: 2, max: 10 });
		for (let i = ZERO_INDEX; i < cntPrescriptionsMainPatient; i++) {
			const doctorId = faker.database.mongodbObjectId();
			const prescription = new PrescriptionModel(
				generatePrescription(mainPatientId, doctorId)
			);
			await prescription.save();
			mainPatientPrescriptions.add(prescription._id.toString());
		}
		for (let i = ZERO_INDEX; i < cntOtherPrescriptions; i++) {
			const patientId = faker.database.mongodbObjectId();
			const doctorId = faker.database.mongodbObjectId();
			const prescription = new PrescriptionModel(
				generatePrescription(patientId, doctorId)
			);
			await prescription.save();
		}
		console.log(mainPatientId);
		const res = await request(app).get(
			`/patient/${mainPatientId}/prescriptions`
		);
		expect(res.status).toBe(OK_STATUS_CODE);

		expect(cntPrescriptionsMainPatient).toBe(res._body.length);
		res._body.forEach((retrievedPrescription) => {
			expect(
				mainPatientPrescriptions.has(retrievedPrescription._id)
			).toBeTruthy();
		});
	});

	it('should return 404 NOT FOUND no prescriptions are found', async () => {
		const patientId = faker.database.mongodbObjectId();
		const res = await request(app).get(
			`/patient/${patientId}/prescriptions`
		);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/patient/${id}/prescriptions`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /patients/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.patient._id).toBe(patient.id);
	});

	it('should return 404 NOT FOUND when the patient is not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/patients/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /address/:pateintId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient addresses correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.deliveryAddresses.length).toBe(
			patient.deliveryAddresses.length
		);
	});

	it('should return 404 NOT FOUND when the patient addresses are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({ message: 'addresses not found' });
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/address/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /address/:pateintId', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the patient addresses correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const deliveryAddresses = generatePatient().deliveryAddresses;
		const id = patient._id.toString();
		const res = await request(app)
			.patch(`/address/${id}`)
			.send({ deliveryAddresses });
		const data = res._body.deliveryAddresses.map((address) => {
			delete address._id;
			return address;
		});
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(data).toEqual(deliveryAddresses);
	});

	it('should return 404 NOT FOUND when the patient addresses are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const deliveryAddresses = generatePatient().deliveryAddresses;
		const res = await request(app)
			.patch(`/address/${id}`)
			.send(deliveryAddresses);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({ message: 'addresses not found' });
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/address/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /family-members/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the patient family members correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.familyMembers.length).toBe(
			patient.familyMembers.length
		);
	});

	it('should return 404 NOT FOUND when the patient family members are not found', async () => {
		const id = faker.database.mongodbObjectId();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(res._body).toEqual({
			message: 'family members not found',
		});
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).get(`/family-members/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /family-members/:id', () => {
	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and add registered family member correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const familyMem = new PatientModel(generatePatient());
		await familyMem.save();
		const id = patient._id.toString();
		const res = await request(app)
			.patch(`/family-members/${id}`)
			.send({ member: { email: familyMem.email } });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.familyMembers[ZERO_INDEX].id.toString()).toBe(familyMem._id.toString());
	});

	it('should return 200 OK and add unregistered family member correctly', async () => {
		const patient = new PatientModel(generatePatient());
		await patient.save();
		const id = patient._id.toString();

		const res = await request(app)
			.patch(`/family-members/${id}`)
			.send({ member: {} });
		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.id).toBeUndefined();
	});

	it('should return 500 ERROR when the id is invalid', async () => {
		const id = faker.lorem.word();
		const res = await request(app).patch(`/family-members/${id}`);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

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
>>>>>>> prescriptions
