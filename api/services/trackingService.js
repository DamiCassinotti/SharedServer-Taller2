'use strict'

exports.add_tracking = function() {
	var query = {
		text: 'INSERT INTO tracking DEFAULT VALUES;'
	}
	return new Promise(function(resolve, reject) {
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(e.message))
	});
}
