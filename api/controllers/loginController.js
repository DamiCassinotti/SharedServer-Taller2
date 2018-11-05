const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const loginUtils = require('../utils/loginUtils.js');

exports.login = function(username, password) {
	return new Promise((resolve, reject) => {
		var token = jwt.sign(
			{ fullName: username },
			config.tokens.secret,
			{ expiresIn: config.tokens.expiresIn }
		);
		if (username == 'administrator' && password == 'password')
			return resolve(loginUtils.generateLoginResponse(token));
		return resolve(null);
	})
};
