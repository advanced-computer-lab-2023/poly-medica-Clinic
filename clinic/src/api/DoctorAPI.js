import DoctorService from '../service/doctor-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import {
    NOT_FOUND_STATUS_CODE,
    ERROR_STATUS_CODE,
    OK_STATUS_CODE,
} from '../utils/Constants.js';

export const doctor = (app) => {
    const service = new DoctorService();

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
};
