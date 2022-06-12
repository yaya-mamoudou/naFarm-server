const { checkErrors } = require('@helpers/checkErrors');
const { Farm } = require('@models/Farm');
const { default: mongoose } = require('mongoose');

const createFarm = async (req, res) => {
	try {
		checkErrors(req, res);

		const {
			title,
			author,
			status,
			location,
			farm_company_name,
			interest_rate,
			amount_raised,
			minimum_investment,
			targeted_amount,
			campaign_start_date,
			campaign_end_date,
			about_farm,
		} = await req.body;

		const farm = await Farm.create({
			title,
			author,
			status,
			location,
			farm_company_name,
			interest_rate,
			amount_raised,
			minimum_investment,
			targeted_amount,
			campaign_start_date,
			campaign_end_date,
			about_farm,
		});
		const responseObject = await Farm.findById(farm._id)
			.populate('author')
			.select('-author.password');

		return res.status(201).json(responseObject);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createFarm };
