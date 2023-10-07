import AdminService from '../service/admin-service.js';
import { EMPTY_SIZE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE, CREATED_STATUS_CODE } from '../utils/Constants.js';

export const admin = (app) => {
    const service = new AdminService();

    app.post('/admins', async (req, res) => {
        try {
            const newAdmin = await service.createAdmin(req.body);
            res.status(CREATED_STATUS_CODE).json({ message: 'admin created', newAdmin });
        } catch (err) {
            res.status(ERROR_STATUS_CODE).json({ err: err.message });
        }
    });
    
}