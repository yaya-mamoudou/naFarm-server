const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const Interest = new Schema({
	user: { ref: 'user', type: mongoose.ObjectId },
	crop: String,
	description: String,
});

const validation = {
	create: [
		check('user')
			.notEmpty()
			.withMessage('user id required')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The user provided is not valid'),
		check('crop').notEmpty().withMessage('crop is required'),
		check('description').notEmpty().withMessage('description is required'),
	],
};

module.exports = { Interest: model('interest', Interest), validation };
