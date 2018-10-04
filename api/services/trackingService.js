'use strict'

exports.add_tracking = () => {
	const query = {
		text: 'INSERT INTO tracking DEFAULT VALUES;'
	}
	return new Promise(function(resolve, reject) {
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error.message))
	});
}

exports.get_trackings = () => {
	const query = {
		text: 'SELECT * FROM tracking ORDER BY id DESC;'
	}
	return new Promise(function(resolve, reject) {
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error.message))
	});
}

exports.get_tracking = (id_tracking) => {
	var query = {
		text: 'SELECT * FROM tracking WHERE id = $1;',
		values: [id_tracking]
	}
	return new Promise(function(resolve, reject) {
		client.query(query)
			.then(data => resolve(data.rows[0]))
			.catch(error => reject(error.message))
	});
}
