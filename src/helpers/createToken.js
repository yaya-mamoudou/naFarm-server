const jwt = require('jsonwebtoken');

module.exports.createToken = async (id, email) => {
	return await jwt.sign({ id, email }, process.env.TOKEN_KEY, { expiresIn: '72h' });
};
