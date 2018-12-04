var rp = require('request-promise');

exports.makeSimpleRequest = (url) => {
	var options = {
		url: url,
		headers: {
	        'User-Agent': 'Request-Promise'
	    },
		json: true
	}
	return rp(options);
}
