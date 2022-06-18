const { checkErrors } = require('@helpers/checkErrors');
const { uploadTocloudinary } = require('@helpers/CloudinarySetup');
const { Discovery } = require('@models/Discovery');

const createDiscovery = async (req, res) => {
	try {
		checkErrors(req);

		const { category, about } = req.body;
		const data = await uploadTocloudinary(req.file.path, 'farm-images');

		const discovery = await Discovery.create({
			category,
			about,
			image: { url: data.url, public_id: data.public_id },
		});

		return res.status(201).json(discovery);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const getDiscoveries = async (req, res) => {
	try {
		const discovery = await Discovery.find({});

		return res.status(201).json(discovery);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createDiscovery, getDiscoveries };
