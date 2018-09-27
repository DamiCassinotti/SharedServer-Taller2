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
		.then(data => res.status(200).json(data.rows))
		.catch(err => res.status(500).json({
			code: 0,
			message: err.message
		}));
}

exports.get_tracking = function(req, res) {
	var query = {
		text: 'SELECT * FROM tracking WHERE id = $1;',
		values: [req.params.trackingId]
	}
	client.query(query)
		.then(data => res.status(200).json(data.rows))
		.catch(err => res.status(500).json({
			code: 0,
			message: err.message
		}));
}

exports.update_tracking = function(req, res) {
	var query = {
		text: 'UPDATE tracking SET status = $2, updateAt = current_date WHERE id = $1;',
		values: [req.body.id, req.body.status]
	}
	client.query(query)
		.then(data => res.status(200).json(data.rows))
		.catch(err => res.status(500).json({
			code: 0,
			message: err.message
		}));
}
