'use strict'

var ajaxUtils = require('../utils/ajaxUtils.js'),
	dbUtils = require('../utils/databaseUtils.js'),
	enviosValidator = require('../validators/enviosValidator.js');

exports.obtener_envios = function(req, res) {
	var query = {
		text: 'SELECT id, estado, desde, hasta FROM envios'
	}
	dbUtils.executeQuery(query, res);
};

exports.crear_envio = function(req, res) {
	if (!enviosValidator.validarNuevoEnvio(req.body)) {
		ajaxUtils.createSimpleResponseError(res, 'PELOTUDO');
	}
	var query = {
		text: 'INSERT INTO envios(desde, hasta) values($1, $2)',
		values: [req.body.desde, req.body.hasta]
	}
	dbUtils.executeQuery(query, res);
};

exports.obtener_envio = function(req, res) {
	var query = {
		text: 'SELECT * FROM envios where id = $1',
		values: [req.params.envioId]
	}
	dbUtils.executeQuery(query, res);
};

exports.eliminar_envio = function(req, res) {
	var query = {
		text: 'DELETE FROM envios where id = $1',
		values: [req.params.envioId]
	}
	dbUtils.executeQuery(query, res);
}

exports.actualizar_envio = function(req, res) {
	var query = {
		text: 'UPDATE envios SET estado = $2 WHERE id = $1',
		values: [req.params.envioId, req.body.estado]
	}
	dbUtils.executeQuery(query, res);
}
