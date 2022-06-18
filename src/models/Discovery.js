const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check, param, body } = require('express-validator');

const Discovery = new Schema({
	category: String,
	image: { url: String, public_id: String },
	about: [{ title: String, content: String }],
});

const validation = {
	create: [
		check('category').notEmpty().withMessage('category is required'),
		// check('image').notEmpty().withMessage('image is required'),
		// check('about').notEmpty().withMessage('about is required'),
		check('about[0][title]')
			.notEmpty()
			.withMessage('about[0][title] field is required in about object'),
		check('about[0][content]')
			.notEmpty()
			.withMessage('about[0][content] field is required in about object'),
	],
};

module.exports = { Discovery: model('discovery', Discovery), validation };
