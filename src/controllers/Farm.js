const { checkErrors } = require('@helpers/checkErrors');
const { uploadTocloudinary } = require('@helpers/CloudinarySetup');
const { Farm } = require('@models/Farm');
const multer = require('multer');

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

		// console.log(req.body.about_farm);

		const data = await uploadTocloudinary(req.file.path, 'farm-images');

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
			image: { url: data.url, public_id: data.public_id },
		});
		const responseObject = await Farm.findById(farm._id).populate({
			path: 'author',
			select: '-password',
		});

		return res.status(201).json(responseObject);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const updateFarm = async (req, res) => {
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

		const farm = await Farm.findByIdAndUpdate(req.params.id, {
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

		if (!farm) {
			return res.status(400).json({ error: "Farm doesn't exist" });
		}
		const responseObject = await Farm.findById(farm._id).populate({
			path: 'author',
			select: '-password',
		});

		return res.status(201).json(responseObject);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		return res.status(500).send(error);
	}
};

const post_farm_activity = async (req, res) => {
	try {
		checkErrors(req, res);
		const { title, blog } = req.body;

		const data = await uploadTocloudinary(req.file.path, 'farm-images');

		const insertActivity = await Farm.findByIdAndUpdate(
			req.params.id,
			{
				$push: {
					farm_activities: {
						title,
						image: { url: data.url, public_id: data.public_id },
						blog,
					},
				},
			},
			{ new: true }
		);

		return res.status(201).json(insertActivity);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		console.log(error);
		return res.status(500).send(error);
	}
};

const get_all_farms = async (req, res) => {
	try {
		const allFarms = await Farm.find({});
		return res.status(201).json(allFarms);
	} catch (error) {
		if (error.errors) {
			return res.status(422).send(error);
		}
		console.log(error);
		return res.status(500).send(error);
	}
};

module.exports = { createFarm, updateFarm, post_farm_activity, get_all_farms };
