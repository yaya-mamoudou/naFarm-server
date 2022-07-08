const { checkErrors } = require('@helpers/checkErrors');
const { Order } = require('@models/Order');

const createOrder = async (req, res) => {
	try {
		checkErrors(req);

		const { order, order_amount, transportation_fee, delivery_location } = req.body;

		console.log({ order, order_amount, transportation_fee, delivery_location });

		const command = await Order.create({
			order,
			order_amount,
			transportation_fee,
			delivery_location,
		});

		return res.status(201).json(command);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({}).populate('order.item');

		return res.status(201).json(orders);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createOrder, getOrders };
