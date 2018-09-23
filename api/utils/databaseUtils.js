'use strict'

exports.executeQuery = function(query, callback) {
	client.connect();
	client.query(query)
		.then(data => callback(data.rows))
		.catch(e => callback(e.message));
}
