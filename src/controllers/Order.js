const { checkErrors } = require('@helpers/checkErrors');
const { Order } = require('@models/Order');

const createOrder = async (req, res) => {
	try {
		checkErrors(req);

		const { items, order_amount, transportation_fee, delivery_location } = req.body;

		const order = await Order.create({
			items,
			order_amount,
			transportation_fee,
			delivery_location,
		});

		return res.status(201).json(order);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({});

		return res.status(201).json(orders);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createOrder, getOrders };
