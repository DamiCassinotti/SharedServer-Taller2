'use strict'

var trackingService = require('../services/trackingService')

exports.add_tracking = () => {
	return new Promise((resolve, reject) => {
		trackingService.addTracking()
			.then(tracking => resolve(tracking))
			.catch(err => reject(err))
	});
}

exports.get_trackings = () => {
	return new Promise((resolve, reject) => {
		trackingService.get_trackings()
			.then(trackings => resolve(trackings))
			.catch(err => reject(err))
	});
}

exports.get_tracking = (id_tracking) => {
	return new Promise((resolve, reject) => {
		trackingService.get_tracking(id_tracking)
			.then(tracking => resolve(tracking))
			.catch(err => reject(err))
	})
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
