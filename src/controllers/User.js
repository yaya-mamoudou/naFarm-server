const { User } = require('@models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const createToken = async (id, email) => {
	return await jwt.sign({ id, email }, process.env.TOKEN_KEY, { expiresIn: '72h' });
};

const createUser = async (req, res) => {
	try {
		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json(errors);
		}

		const { first_name, last_name, email, password, phone, dob, status = 'sponsor' } = req.body;

		const isUserExist = await User.findOne({ email });

		if (isUserExist) {
			return res.status(409).send('User Already Exist with this email. Please Login!');
		}

		//Encrypt user password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// Create user in our database
		const user = await User.create({
			first_name,
			last_name,
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
			dob,
			status,
			phone,
		});

		const token = createToken(user._id, user.email);

		// user.token = token;

		res.status(201).json({ user_id: user._id, token: token });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const login = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json(errors);
		}
		const { password, email } = req.body;

		// Validate if user exist in our database
		const user = await User.findOne({ email });

		const compare = await bcrypt.compare(password, user.password);

		if (user && compare) {
			// Create token
			const token = await createToken(user._id, user.email);
			user.token = token;

			const finalUserObject = {};

			// remove password from object
			Object.keys(user._doc).forEach(
				(key) => key !== 'password' && (finalUserObject[key] = user[key])
			);

			return res.status(201).json({ user: finalUserObject });
		}
		return res.status(400).send('Invalid credentials');
	} catch (error) {
		res.status(500).send(error.message);
	}
};

module.exports = { createUser, login };
