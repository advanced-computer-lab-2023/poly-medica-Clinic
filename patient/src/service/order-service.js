import OrderRepository from '../database/repository/order-repository.js';

class OrderService {
	constructor() {
		this.repository = new OrderRepository();
	}

	async getOrders(id) {
		const orders = await this.repository.findOrders(id);
		return orders;
	}

	async getPendingOrders() {
		const orders = await this.repository.findPendingOrders();
		return orders;
	}

	async addOrder(order) {
		const orders = await this.repository.addOrder(order);
		return orders;
	}

	async updateOrder(id, order) {
		const orders = await this.repository.updateOrder(id, order);
		return orders;
	}
}

export default OrderService;
