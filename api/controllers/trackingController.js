'use strict'

exports.add_tracking = function(req, res) {
	var query = {
		text: 'INSERT INTO tracking DEFAULT VALUES;'
	}
	client.query(query)
		.then(data => res.status(201).json(data.rows))
		.catch(err => res.status(500).json({
			code: 0,
			message: err.message
		}));
}

exports.get_trackings = function(req, res) {
	var query = {
		text: 'SELECT * FROM tracking;'
	}
	client.query(query)
		.then(data => res.status(201).json(data.rows))
		.catch(err => res.status(500).json({
			code: 0,
			message: err.message
		}));
}
