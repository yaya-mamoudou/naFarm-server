const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const Order = new Schema({
	items: [
		{ id: { ref: 'product', type: mongoose.ObjectId }, quantity: Number, total_amount: Number },
	],
});

const validation = {
	create: [
		check('order[*][id]')
			.notEmpty()
			.withMessage('product id required')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The product provided is not valid'),
		check('order[*][quantity]').notEmpty().withMessage('quantity is required'),
		check('order.*.total_amount').notEmpty().withMessage('total_amount is required'),
	],
};

module.exports = { Order: model('order', Order), validation };
