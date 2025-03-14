const { Order, OrderItem, Comic } = require('../models');

class OrderRepository {
    async create(orderData, items) {
        const order = await Order.create(orderData);

        await OrderItem.bulkCreate(items.map(item => ({
            ...item,
            orderId: order.id
        })));

        return order;
    }

    async findByUserId(userId) {
        return await Order.findAll({
            where: { userId },
            include: [{ model: OrderItem, include: [Comic] }]
        });
    }

    async findById(id) {
        return await Order.findByPk(id, {
            include: [{ model: OrderItem, include: [Comic] }]
        })
    }

}

module.exports = new OrderRepository();
