'use strict'

var dbUtils = require('../utils/databaseUtils.js');

exports.login = function(req, res) {
	var response = {
		metadata: {
			version: '0.1'
		},
		token: {
			expiresAt: 1,
			token: '12345ASDF'
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