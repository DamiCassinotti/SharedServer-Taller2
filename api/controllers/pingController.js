'use strict'

var ajaxUtils = require('../utils/ajaxUtils.js'),
	rp = require('request-promise');

exports.ping = function(req, res) {
	var options = {
		url: 'http://app-server-taller2.herokuapp.com/ping',
		headers: {
	        'User-Agent': 'Request-Promise'
	    },
		json: true
	}
	rp(options)
		.then(data => res.status(200).json(ajaxUtils.createSimpleResponseOk(data)))
		.catch(err => res.status(200).json(ajaxUtils.createSimpleResponseError(err)));
}
