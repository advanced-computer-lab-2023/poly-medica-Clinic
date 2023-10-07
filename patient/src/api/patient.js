import PatientService from '../service/patient-service.js';
import {
    EMPTY_SIZE,
    NOT_FOUND_STATUS_CODE,
    OK_STATUS_CODE,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

export const patient = (app) => {
    const service = new PatientService();

    app.get('/all-patients', async (req, res) => {
        const allPatients = await service.getAllPatient();
        if (allPatients.length > EMPTY_SIZE) {
            res.status(OK_STATUS_CODE).json(allPatients);
        } else {
            res.status(NOT_FOUND_STATUS_CODE).json({
                message: 'patients not found',
            });
        }
    });

    app.get('/family-members/:id', async (req, res) => {
        const { id } = req.params;
        if (!isValidMongoId(id)) {
            return res
                .status(404)
                .json({ message: 'family members not found' });
        }
        try {
            const data = await service.getFamilyMembers(id);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({ message: 'family members not found' });
        }
    });
};
