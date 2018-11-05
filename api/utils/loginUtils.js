const jwt = require('jsonwebtoken');
const config = require('../../config.json');

exports.generateLoginResponse = (token) => {
	return {
		"metadata": {
			"version": config.version
		},
		"token": {
			"token": token,
			"expiresAt": new Date(new Date().getTime() + config.tokens.expiresIn*1000)
		}
	}
}
