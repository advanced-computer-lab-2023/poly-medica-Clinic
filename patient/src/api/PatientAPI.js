import PatientService from '../service/patient-service.js';
import { isValidMongoId } from '../utils/Validation.js';

import {
    EMPTY_SIZE,
    NOT_FOUND_STATUS_CODE,
    OK_STATUS_CODE,
    ERROR_STATUS_CODE,
    DUPLICATE_KEY_ERROR_CODE,
    BAD_REQUEST_CODE_400,
    PATIENT_ENUM,
} from '../utils/Constants.js';
import { ZERO_INDEX } from '../../../clinic/src/utils/Constants.js';

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
                .status(NOT_FOUND_STATUS_CODE)
                .json({ message: 'Invalid ID' });
        }
        try {
            const data = await service.getFamilyMembers(id);
            res.status(OK_STATUS_CODE).json(data);
        } catch (err) {
            res.status(NOT_FOUND_STATUS_CODE).json({
                message: 'family members not found',
            });
        }
    });

    app.patch('/family-members/:id', async (req, res) => {
        const { id } = req.params;
        if (!isValidMongoId(id)) {
            return res.status(NOT_FOUND_STATUS_CODE).json({
                message: 'Invalid ID',
            });
        }
        try {
            const { name, userName, nationalId, age, gender, relation } =
                req.body;
            const patient = await service.getPatientByUserName(userName);
            if (patient) {
                const data = await service.getFamilyMembers(id);
                console.log('Data = ', data);
                const newFamilyMem = [
                    { name, userName, nationalId, age, gender, relation },
                    ...data.familyMembers,
                ];
                const newData = await service.addFamilyMember(id, newFamilyMem);
                res.status(OK_STATUS_CODE).json(newData);
            } else {
                res.status(NOT_FOUND_STATUS_CODE).json({
                    message: 'username not found',
                });
            }
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

    app.get('/order/:pateintId', async (req, res) => {
        const { pateintId } = req.params;
        if (!isValidMongoId(pateintId)) {
            return res.status(ERROR_STATUS_CODE).json({
                message: 'Patient ID is invalid',
            });
        }
        try {
            const data = await service.getOrders(pateintId);
            if (data) res.status(OK_STATUS_CODE).json(data);
            else
                res.status(NOT_FOUND_STATUS_CODE).json({
                    message: 'orders not found',
                });
        } catch (err) {
            res.status(ERROR_STATUS_CODE).json({
                message: 'error occurred while fetching orders',
            });
        }
    });

    app.post('/order', async (req, res) => {
        try {
            const { amount, details, patientId } = req.body;
            const order = { amount, details, patientId };
            const data = await service.addOrder(order);
            if (data) res.status(OK_STATUS_CODE).json(data);
            else
                res.status(NOT_FOUND_STATUS_CODE).json({
                    message: 'orders not found',
                });
        } catch (err) {
            res.status(ERROR_STATUS_CODE).json({
                message: 'error occurred while adding order',
                error: err.message,
            });
        }
    });

    app.patch('/order', async (req, res) => {
        try {
            const order = req.body;
            const data = await service.updateOrder(order);
            if (data) res.status(OK_STATUS_CODE).json(data);
            else
                res.status(NOT_FOUND_STATUS_CODE).json({
                    message: 'orders not found',
                });
        } catch (err) {
            res.status(ERROR_STATUS_CODE).json({
                message: 'error occurred while updating order',
                error: err.message,
            });
        }
    });
};
