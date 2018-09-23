'use strict'

var rp = require('request-promise');

exports.makeSimpleRequest = function(url, callback) {
	var options = {
		url: url,
		headers: {
	        'User-Agent': 'Request-Promise'
	    },
		json: true
	}
	rp(options)
		.then(data => callback(data))
		.catch(err => callback(err));
}
