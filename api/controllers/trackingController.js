'use strict'

var dbUtils = require('../utils/databaseUtils.js');

exports.add_tracking = function(req, res) {
	var query = {
		text: 'INSERT INTO tracking DEFAULT VALUES;'
	}
	dbUtils.executeQuery(query)
		.then(data => res.status(201).json(data.rows))
		.catch(err => res.status(500).json({
			code: 0,
			message: err.message
		}));
}
