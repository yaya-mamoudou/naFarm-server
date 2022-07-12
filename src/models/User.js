const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const User = new Schema({
	full_name: { type: String },
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	phone: { type: Number, unique: true },
	status: { type: String, default: 'investor' },
	token: { type: String },
	profile: { url: String, public_id: String },
});

const validation = {
	register: [
		// check('full_name').notEmpty().withMessage('first_name is required'),
		// check('password')
		// 	.notEmpty()
		// 	.withMessage('password is required')
		// 	.isLength({ min: 6 })
		// 	.withMessage('password must be minimum 6 characters'),
		// check('email')
		// 	.notEmpty()
		// 	.withMessage('Email is required')
		// 	.isEmail()
		// 	.withMessage('Enter a valid email'),
	],
	login: [
		check('phone')
			.notEmpty()
			.withMessage('phone is required')
			.isNumeric()
			.withMessage('input a valid number address'),
		check('password')
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 6 })
			.withMessage('password length must be a least 6 characters'),
	],
};

module.exports = { User: model('user', User), validation };
