
class OrderController {
    async create(req, res) {
        try {
            const { items } = req.body;
            const userId = req.user.id;

            if(!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Items are required' })

            let total = 0;
            for (const item of items) {
                const comic = await comicRepository.findById(item.comicId);
                if(!comic) return res.status(404).json({ message: ` Comic ${item.comicId} not found ` });

                if (comic.stock < item.quantity) {
                    return res.status(400).json({ message: ` Insufficient stock for ${ comic.title } ` })
                }

                total += comic.price * item.quantity;
                await comicRepository.update(comic.id, { stock: comic.stock- item.quantity });
            }

            const orderData = { userId, total, status: 'pending' };
            const order = await orderRepository.create(orderData, items);

            res.status(201).json({ message: 'Order created successfully' }, order);

        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error: error.message })
        }
    }

    async getUserOrders(req, res) {
        try {
            const userId = req.user.id;
            const orders = await orderRepository.findByUserId(userId);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error: error.message })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const order = await orderRepository.findById(id);

            if(!order) return res.status(404).json({ message: 'Order not found' });

            if (order.userId !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            return res.status(200).json(order);

        } catch (error) {
            res.status(500).json({ message: 'Error fetching order', error: error.message })
        }
    }
}

module.exports = new OrderController();
