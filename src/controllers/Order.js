const { checkErrors } = require('@helpers/checkErrors');
const { Order } = require('@models/Order');

const createOrder = async (req, res) => {
	try {
		checkErrors(req);

		const { user, order, order_amount, transportation_fee, delivery_location } = req.body;

		const command = await Order.create({
			order,
			order_amount,
			transportation_fee,
			delivery_location,
			user,
		});

		const curr = await Order.findById(command._id)
			.populate({
				path: 'order.item delivery_location',
				select: '-description',
				populate: { path: 'seller', select: '-password -status -email' },
			})
			.populate('delivery_location');

		return res.status(201).json(curr);
	} catch (error) {
		console.log(error);
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const getOrders = async (req, res) => {
	try {
		let orders;
		if (req.params?.id) {
			orders = await Order.find({ user: req.params?.id })
				.populate({
					path: 'order.item delivery_location',
					select: '-description',
					populate: { path: 'seller', select: '-password -status -email' },
				})
				.populate('delivery_location');
		} else {
			orders = await Order.find({}).populate('order.item').populate('user');
		}

		return res.status(201).json(orders);
	} catch (error) {
		console.log(error);
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createOrder, getOrders };
