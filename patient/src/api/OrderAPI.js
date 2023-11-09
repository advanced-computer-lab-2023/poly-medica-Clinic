import OrderService from '../service/order-service.js';
import { isValidMongoId } from '../utils/Validation.js';

import {
    NOT_FOUND_STATUS_CODE,
    OK_STATUS_CODE,
    ERROR_STATUS_CODE,
} from '../utils/Constants.js';

export const order = (app) => {
    const service = new OrderService();

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
