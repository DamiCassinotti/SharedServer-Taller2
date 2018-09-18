'use strict'

var ajaxUtils = require('./ajaxUtils.js');

exports.executeQuery = function(query, callback) {
	client.connect();
	client.query(query)
		.then(data => callback(ajaxUtils.createSimpleResponseOk(data.rows)))
		.catch(e => callback(ajaxUtils.createSimpleResponseError(e.message)));
}
