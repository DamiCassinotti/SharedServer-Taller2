'use strict'

var ajaxUtils = require('../utils/ajaxUtils.js'),
	dbUtils = require('../utils/databaseUtils.js'),
	enviosValidator = require('../validators/enviosValidator.js');

exports.obtener_envios = function(req, res) {
	var query = {
		text: 'SELECT id, estado, desde, hasta FROM envios'
	}
	res.status(200).json(dbUtils.executeQuery(query));
};

exports.crear_envio = function(req, res) {
	var query = {
		text: 'INSERT INTO envios(desde, hasta) values($1, $2)',
		values: [req.body.desde, req.body.hasta]
	}
	res.status(200).json(dbUtils.executeQuery(query));
};

exports.obtener_envio = function(req, res) {
	var query = {
		text: 'SELECT * FROM envios where id = $1',
		values: [req.params.envioId]
	}
	res.status(200).json(dbUtils.executeQuery(query));
};

exports.eliminar_envio = function(req, res) {
	var query = {
		text: 'DELETE FROM envios where id = $1',
		values: [req.params.envioId]
	}
	res.status(200).json(dbUtils.executeQuery(query));
}

exports.actualizar_envio = function(req, res) {
	var query = {
		text: 'UPDATE envios SET estado = $2 WHERE id = $1',
		values: [req.params.envioId, req.body.estado]
	}
	res.status(200).json(dbUtils.executeQuery(query));
}
