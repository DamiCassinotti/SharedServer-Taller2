'use strict'

var ajaxUtils = require('../utils/ajaxUtils.js'),
	dbUtils = require('../utils/databaseUtils.js'),
	enviosValidator = require('../validators/enviosValidator.js');

exports.obtener_envios = function(req, res) {
	var query = {
		text: 'SELECT id, estado, desde, hasta FROM envios'
	}
	var callback = function(data) {
		res.status(200).json(data);
	}
	dbUtils.executeQuery(query, callback);
};

exports.crear_envio = function(req, res) {
	var query = {
		text: 'INSERT INTO envios(desde, hasta) values($1, $2)',
		values: [req.body.desde, req.body.hasta]
	}
	var callback = function(data) {
		res.status(200).json(data);
	}
	dbUtils.executeQuery(query, callback);
};

exports.obtener_envio = function(req, res) {
	var query = {
		text: 'SELECT * FROM envios where id = $1',
		values: [req.params.envioId]
	}
	var callback = function(data) {
		res.status(200).json(data);
	}
	dbUtils.executeQuery(query, callback);
};

exports.eliminar_envio = function(req, res) {
	var query = {
		text: 'DELETE FROM envios where id = $1',
		values: [req.params.envioId]
	}
	var callback = function(data) {
		res.status(200).json(data);
	}
	dbUtils.executeQuery(query, callback);
}

exports.actualizar_envio = function(req, res) {
	var query = {
		text: 'UPDATE envios SET estado = $2 WHERE id = $1',
		values: [req.params.envioId, req.body.estado]
	}
	var callback = function(data) {
		res.status(200).json(data);
	}
	dbUtils.executeQuery(query, callback);
}
