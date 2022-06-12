const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const Investment = new Schema({
	user: { type: mongoose.ObjectId, ref: 'user' },
	farm: { type: mongoose.ObjectId, ref: 'farm' },
	amount_invested: Number,
	amount_expected: Number,
});

const validation = {
	create: [
		check('user')
			.notEmpty()
			.withMessage('user id required')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The user provided is not valid'),
		check('farm')
			.notEmpty()
			.withMessage('farm id required')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The farm provided is not valid'),
		check('amount_invested').notEmpty().withMessage('amount_invested is required'),
	],
};

module.exports = { Investment: model('investment', Investment), validation };
