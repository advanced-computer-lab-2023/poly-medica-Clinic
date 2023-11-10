import OrderModel from '../models/Order.js';
import { ORDER_STATUS, ZERO_INDEX } from '../../utils/Constants.js';

class OrderRepository {
	async findOrders(id) {
		const orders = await OrderModel.find({ patientId: id }).sort({
			createdAt: -1,
		});
		return orders;
	}

	async findPendingOrders() {
		const orders = await OrderModel.find({
			status: ORDER_STATUS[ZERO_INDEX],
		}).sort({
			createdAt: -1,
		});
		return orders;
	}

	async addOrder(order) {
		const newOrder = await OrderModel.create(order);
		return newOrder;
	}

	async updateOrder(id, order) {
		const updatedOrder = await OrderModel.findOneAndUpdate(
			{ _id: id },
			order,
			{ new: true, runValidators: true }
		);
		return updatedOrder;
	}
}

export default OrderRepository;
