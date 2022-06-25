const { checkErrors } = require('@helpers/checkErrors');
const { uploadTocloudinary } = require('@helpers/CloudinarySetup');
const { Product } = require('@models/Product');

const createProducts = async (req, res) => {
	try {
		checkErrors(req);

		const { seller, title, location, unit_price, description } = req.body;
		const images = [];

		for (const file of req.files) {
			const data = await uploadTocloudinary(file.path, 'farm-images');
			images.push({ url: data.url, public_id: data.public_id });
		}

		const product = await Product.create({
			seller,
			title,
			location,
			unit_price,
			description,
			images,
		});

		return res.status(201).json(product);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const getProducts = async (req, res) => {
	try {
		const products = await Product.find({}).populate({ path: 'seller', select: '-password' });

		return res.status(201).json(products);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

module.exports = { createProducts, getProducts };
