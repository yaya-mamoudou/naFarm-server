const jwt = require('jsonwebtoken');

module.exports.verifyAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// check if token exists
	if (token) {
		// verify token
		jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
			//not authorized
			if (err) {
				return res.status(404).json({ error: 'Login required' });
			}
			// access granted
			next();
		});
	}

	//not authorized
	return res.status(404).json({ error: 'Login required' });
};
