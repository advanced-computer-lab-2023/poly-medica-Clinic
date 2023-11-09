import OrderModel from '../models/Order.js';

class OrderRepository {
    async findOrders(id) {
        const orders = await OrderModel.find({ patientId: id });
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
