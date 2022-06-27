const { checkErrors } = require('@helpers/checkErrors');
const { Interest } = require('@models/Interest');

const createInterest = async (req, res) => {
	try {
		checkErrors(req);

		const { user, crop, description } = req.body;

		const interest = await Interest.create({ user, crop, description }).then((t) =>
			t.populate({ path: 'user', select: '-password' })
		);

		return res.status(201).json(interest);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const getInterests = async (req, res) => {
	try {
		const interest = await Interest.find({}).populate('user');

		return res.status(201).json(interest);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createInterest, getInterests };
