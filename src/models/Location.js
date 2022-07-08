const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const Location = new Schema({
	region: String,
	town: String,
});

const validation = {
	create: [
		check('location[*][region]').notEmpty().withMessage('region is required'),
		check('location[*][town]').notEmpty().withMessage('location field is required'),
	],
};

module.exports = { Location: model('location', Location), validation };
