'use strict'

exports.executeQuery = function(query, callback) {
	client.connect();
	return client.query(query);
}
