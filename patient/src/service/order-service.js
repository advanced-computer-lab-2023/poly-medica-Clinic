import OrderRepository from '../database/repository/order-repository.js';

class OrderService {
    constructor() {
        this.repository = new OrderRepository();
    }

    async getOrders(id) {
        const orders = await this.repository.findOrders(id);
        return orders;
    }

    async addOrder(order) {
        const orders = await this.repository.addOrder(order);
        return orders;
    }

    async updateOrder(order) {
        const orders = await this.repository.updateOrder(order);
        return orders;
    }
}

export default OrderService;
