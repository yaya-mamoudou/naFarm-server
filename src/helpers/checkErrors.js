const { validationResult } = require('express-validator');

module.exports.checkErrors = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw errors;
	}
};
