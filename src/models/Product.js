const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const Product = new Schema({
	seller: { type: mongoose.ObjectId, ref: 'user' },
	title: { type: String, required: true },
	location: String,
	description: String,
	unit_price: Number,
	images: [{ url: String, public_id: String }],
});

const validation = {
	create: [
		check('seller')
			.notEmpty()
			.withMessage('seller id required')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The seller provided is not valid'),
		check('title').notEmpty().withMessage('title id required'),
		check('location').notEmpty().withMessage('location is required'),
		check('description').notEmpty().withMessage('description is required'),
		check('unit_price').notEmpty().withMessage('unit_price is required'),
	],
};

module.exports = { Product: model('product', Product), validation };
