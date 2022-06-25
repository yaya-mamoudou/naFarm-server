const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const Order = new Schema({
	items: [
		{ id: { ref: 'product', type: mongoose.ObjectId }, quantity: Number, total_amount: Number },
	],
	order_amount: Number,
	transportation_fee: Number,
	delivery_location: { region: String, town: String },
});

const validation = {
	create: [
		check('items[*][id]')
			.notEmpty()
			.withMessage('product id required')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The product provided is not valid'),
		check('items[*][quantity]').notEmpty().withMessage('quantity is required'),
		check('items.*.total_amount').notEmpty().withMessage('total_amount is required'),
		check('order_amount').notEmpty().withMessage('order_amount is required'),
		check('transportation_fee').notEmpty().withMessage('transportation_fee is required'),
		check('delivery_location[region]').notEmpty().withMessage('delivery_location is required'),
		check('delivery_location[town]').notEmpty().withMessage('delivery_location is required'),
	],
};

module.exports = { Order: model('order', Order), validation };
