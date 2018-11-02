'use strict'

const jwt = require('jsonwebtoken');
const config = require('../../config.json');

exports.login = function(req, res, then) {
	var response = {
		metadata: {
			version: '0.1'
		},
		token: {
			token: jwt.sign(
				{ fullName: 'admin', email: 'admin@admin.com' },
            	config.tokens.secret,
            	{ expiresIn: config.tokens.expiresIn }
			),
			expiresAt: new Date(new Date().getTime() + config.tokens.expiresIn*1000)
		}
	}
	if (!req.body.username || !req.body.password)
		return res.status(400).json({code: 0, message: 'Parametros faltantes'});
	if (req.body.username == 'error')
		return res.status(500).json({code: 1, message: 'Error inesperado'});
	if (req.body.username == 'administrator' && req.body.password == 'password')
		return res.status(201).json(response);
	return res.status(401).json({code: 2, message: 'Credenciales invalidas'});
};
