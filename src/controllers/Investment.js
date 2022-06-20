const { checkErrors } = require('@helpers/checkErrors');
const { Farm } = require('@models/Farm');
const { Investment } = require('@models/Investment');
const mongoose = require('mongoose');

const createInvestment = async (req, res) => {
	try {
		checkErrors(req, res);

		const { farm, user, amount_invested, amount_expected } = await req.body;

		// ??? need to add amount invested to the total amount reaised for the farm
		let queryFarm = await Farm.findById(farm);

		if (queryFarm) {
			if (queryFarm.status == 'open') {
				// check is amount user trying to invest is more than what is left to invest in
				if (queryFarm.targeted_amount - queryFarm.raised_amount < amount_invested) {
					return res.status(422).send('amount is more than amount left to be raised');
				}

				if (parseInt(amount_invested) % queryFarm.minimum_investment !== 0) {
					//Check if the right amount to be invested was sent. (must be a multiple of the minimum_investment)
					return res
						.status(422)
						.send('amount entered is not permissible for this campaign');
				}
				console.log('pass');
			}

			// block more investments when campaign is closed
			if (queryFarm.status == 'closed') {
				return res.status(400).send('Sorry this campaign is closed');
			}
		}

		// increment amount invested to the total amount raised for the campaign
		await Farm.findByIdAndUpdate(
			farm,
			{
				$inc: { amount_raised: parseInt(amount_invested) },
			},
			{ new: true }
		).exec(async (err, data) => {
			if (!err) {
				// After incrementing the amount invested to the total invested,
				// we check if targeted amount == raised amount
				// if yes we close the campaign
				if (data.targeted_amount == data.amount_raised) {
					const close = await Farm.findByIdAndUpdate(farm, { status: 'closed' });
				}
			}
		});

		const investment = await Investment.create({
			farm,
			user,
			amount_invested,
			amount_expected:
				(parseInt(amount_invested) * queryFarm.interest_rate) / 100 +
				parseInt(amount_invested),
		});

		// ??? need to substract amount invested from total amount reaised for the farm in case investment creation fails
		!investment &&
			(await Farm.findByIdAndUpdate(farm, {
				$dec: { amount_raised: parseInt(amount_invested) },
			}));

		const responseObject = await Investment.find({ user })
			.populate({
				path: 'user',
				select: '-password',
			})
			.populate('farm');

		return res.status(201).json(responseObject);
	} catch (error) {
		console.log(error);
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const userInvestments = async (req, res) => {
	try {
		const { id } = req.params;
		const investments = await Investment.find({ user: id });
		return res.status(201).json(investments);
	} catch (error) {
		console.log(error);
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createInvestment, userInvestments };
