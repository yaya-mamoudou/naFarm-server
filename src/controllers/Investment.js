const { checkErrors } = require('@helpers/checkErrors');
const { Investment } = require('@models/Investment');
const mongoose = require('mongoose');

const createInvestment = async (req, res) => {
	try {
		checkErrors(req, res);

		const { farm, user, amount_expected, amount_invested } = await req.body;

		// ??? need to add amount invested to the total amount reaised for the farm
		// code goes here

		// ****************************

		const investment = await Investment.create({
			farm,
			user,
			amount_expected,
			amount_invested,
		});

		// ??? need to substract amount invested from total amount reaised for the farm in case investment creation fails
		// code goes here

		// ****************************

		const responseObject = await Investment.findById(investment._id)
			.populate({
				path: 'user',
				select: '-password',
			})
			.populate('farm');

		return res.status(201).json(responseObject);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		console.log(error);
		return res.status(500).send(error);
	}
};

module.exports = { createInvestment };
