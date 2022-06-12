const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const User = new Schema({
	first_name: { type: String },
	last_name: { type: String },
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	phone: { type: Number },
	dob: { type: Date },
	status: { type: String, default: 'investor' },
	token: { type: String },
});

const validation = {
	register: [
		check('first_name').notEmpty().withMessage('first_name is required'),
		check('password')
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 6 })
			.withMessage('password must be minimum 6 characters'),
		check('email')
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Enter a valid email'),
		check('status')
			.isIn(['investor', 'farmer', 'admin'])
			.withMessage('status must be one of these: [investor, farmer, admin]'),
	],
	login: [
		check('email')
			.notEmpty()
			.withMessage('email is required')
			.isEmail()
			.withMessage('input a valid email address'),
		check('password')
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 6 })
			.withMessage('password length must be a least 6 characters'),
	],
};

module.exports = { User: model('user', User), validation };
