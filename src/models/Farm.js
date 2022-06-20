const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check, param, body } = require('express-validator');

const Farm = new Schema({
	title: String,
	image: { url: String, public_id: String },
	author: { type: mongoose.ObjectId, ref: 'user' },
	location: String,
	farm_company_name: String,
	interest_rate: Number,
	targeted_amount: Number,
	amount_raised: { type: Number, default: 0 },
	minimum_investment: Number,
	status: { type: String, default: 'open', enum: ['open', 'close'] },
	campaign_start_date: Date,
	campaign_end_date: Date,
	about_farm: [{ title: String, content: String }],
	farm_activities: [
		{ image: { url: String, public_id: String }, blog: [{ title: String, content: String }] },
	],
});

const validation = {
	create: [
		check('title').notEmpty().withMessage('title is required'),
		check('author').notEmpty().withMessage('author is required'),
		check('farm_company_name').notEmpty().withMessage('farm_company_name is required'),
		check('interest_rate').notEmpty().withMessage('interest_rate is required'),
		check('targeted_amount').notEmpty().withMessage('targeted_amount is required'),
		check('minimum_investment').notEmpty().withMessage('minimum_investment is required'),
		check('status')
			.optional()
			.isIn(['open', 'closed'])
			.withMessage('status must be either open or closed'),
		check('campaign_start_date').notEmpty().withMessage('campaign_start_date is required'),
		check('campaign_end_date').notEmpty().withMessage('campaign_end_date is required'),
	],
	update: [
		param('id')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The provided farm id is not a valid id'),
	],
	post_farm_activity: [],
};

module.exports = { Farm: model('farm', Farm), validation };
