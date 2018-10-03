'use strict'

module.exports = function(app) {
	var trackingController = require('../controllers/trackingController');

	app.route('/tracking')
		.post(function(req, res) {
			tracking.add_tracking()
				.then(user => res.status(201).json(user))
				.catch(err => res.status(500).json({
					code: 0,
					message: err.message
				}));
		})
		.get(trackingController.get_trackings)

	app.route('/tracking/:trackingId')
		.get(trackingController.get_tracking)
		.put(trackingController.update_tracking)

};
