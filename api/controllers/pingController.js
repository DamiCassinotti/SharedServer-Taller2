'use strict'

var requestUtils = require('../utils/requestUtils.js'),
	rp = require('request-promise');

exports.ping = function(req, res) {
	var callback = function(data) {
		res.status(200).json(data);
	}
	requestUtils.makeSimpleRequest('http://app-server-taller2.herokuapp.com/ping', callback)
}
