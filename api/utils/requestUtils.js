'use strict'

var ajaxUtils = require('../utils/ajaxUtils.js'),
	rp = require('request-promise');

exports.makeSimpleRequest = function(url, callback) {
	var options = {
		url: url,
		headers: {
	        'User-Agent': 'Request-Promise'
	    },
		json: true
	}
	rp(options)
		.then(data => callback(ajaxUtils.createSimpleResponseOk(data)))
		.catch(err => callback(ajaxUtils.createSimpleResponseError(err)));
}
