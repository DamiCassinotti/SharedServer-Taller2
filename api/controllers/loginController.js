const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const loginUtils = require('../utils/loginUtils.js');
const loginService = require('../services/loginService.js');

exports.login = (username, password) => {
	return new Promise(async (resolve, reject) => {
		var token = jwt.sign(
			{ fullName: username },
			config.tokens.secret,
			{ expiresIn: config.tokens.expiresIn }
		);
		loginService.isValidLogin(username, password)
			.then(validLogin => {
				if (!validLogin)
					return resolve(null);
				resolve(loginUtils.generateLoginResponse(token));
			})
			.catch(err => reject(err))

	})
};
