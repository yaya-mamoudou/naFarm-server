const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check, param, body } = require('express-validator');

const Farm = new Schema({
	title: String,
	image: String,
	author: { type: mongoose.ObjectId, ref: 'user' },
	location: String,
	farm_company_name: String,
	interest_rate: Number,
	targeted_amount: Number,
	amount_raised: Number,
	minimum_investment: Number,
	status: { type: String, default: 'open', enum: ['open', 'close'] },
	campaign_start_date: Date,
	campaign_end_date: Date,
	about_farm: String,
	farm_activities: [{ title: String, image: String, description: String, blog: String }],
});

const validation = {
	create: [
		check('title').notEmpty().withMessage('title is required'),
		check('author').notEmpty().withMessage('author is required'),
		check('farm_company_name').notEmpty().withMessage('farm_company_name is required'),
		check('interest_rate').notEmpty().withMessage('interest_rate is required'),
		check('targeted_amount').notEmpty().withMessage('targeted_amount is required'),
		check('amount_raised').notEmpty().withMessage('amount_raised is required'),
		check('minimum_investment').notEmpty().withMessage('minimum_investment is required'),
		check('status')
			.isIn(['open', 'closed'])
			.withMessage('status must be either open or closed'),
		check('campaign_start_date').notEmpty().withMessage('campaign_start_date is required'),
		check('campaign_end_date').notEmpty().withMessage('campaign_end_date is required'),
		// .not()
		check('about_farm').notEmpty().withMessage('about_farm is required'),
	],
	update: [
		param('id')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The provided farm id is not a valid id'),
	],
	post_farm_activity: [
		body('title').notEmpty().withMessage('title is required'),
		body('image').notEmpty().withMessage('image is required'),
		body('description').notEmpty().withMessage('description is required'),
		body('blog').notEmpty().withMessage('blog is required'),
	],
};

module.exports = { Farm: model('farm', Farm), validation };
