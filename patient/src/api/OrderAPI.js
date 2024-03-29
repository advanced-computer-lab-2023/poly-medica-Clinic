import OrderService from '../service/order-service.js';
import { isValidMongoId } from '../utils/Validation.js';

import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
} from '../utils/Constants.js';

export const order = (app) => {
	const service = new OrderService();

	app.get('/order/pending', async (req, res) => {
		try {
			const data = await service.getPendingOrders();
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while fetching orders',
			});
		}
	});

	app.get('/order/:patientId', async (req, res) => {
		const { patientId } = req.params;
		if (!isValidMongoId(patientId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'Patient ID is invalid',
			});
		}
		try {
			const data = await service.getOrders(patientId);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while fetching orders',
			});
		}
	});

	app.post('/order', async (req, res) => {
		try {
			const { order } = req.body;
			const data = await service.addOrder(order);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while adding order',
				error: err.message,
			});
		}
	});

	app.patch('/order/:orderId', async (req, res) => {
		const { orderId } = req.params;
		if (!isValidMongoId(orderId)) {
			return res.status(ERROR_STATUS_CODE).json({
				message: 'Order ID is invalid',
			});
		}
		try {
			const { order } = req.body;
			const data = await service.updateOrder(orderId, order);
			res.status(OK_STATUS_CODE).json(data);
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({
				message: 'error occurred while updating order',
				error: err.message,
			});
		}
	});
};
