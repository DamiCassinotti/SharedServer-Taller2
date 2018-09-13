'use strict'

var ajaxUtils = require('./ajaxUtils.js');
	// pg = require('pg'),
	// connectionString = process.env.DATABASE_URL || config.database.default,
	// client = new pg.Client(connectionString);


exports.executeQuery = function(query) {
	client.connect();
	client.query(query)
		.then(data => ajaxUtils.createSimpleResponseOk(data.rows))
		.catch(e => ajaxUtils.createSimpleResponseError(e.message));
}
