const { checkErrors } = require('@helpers/checkErrors');
const { Location } = require('@models/');

const addLocations = async (req, res) => {
	try {
		checkErrors(req);

		const locations = await Location.insertMany(req.body);

		return res.status(201).json(locations);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const getLocations = async (req, res) => {
	try {
		const locations = await Location.find({});

		return res.status(201).json(locations);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { addLocations, getLocations };
