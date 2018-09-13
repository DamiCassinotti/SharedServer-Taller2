'use strict'

var ajaxUtils = require('./ajaxUtils.js'),
	pg = require('pg'),
	connectionString = process.env.DATABASE_URL || config.database.default,
	client = new pg.Client(connectionString);
client.connect();

exports.executeQuery = function(query) {
	client.query(query)
		.then(data => ajaxUtils.createSimpleResponseOk(data.rows))
		.catch(e => ajaxUtils.createSimpleResponseError(e.message));
}
