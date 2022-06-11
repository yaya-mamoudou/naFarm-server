module.exports.dataValidation = (err) => {
	let errors = {};
	if (err.message.includes('validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};
