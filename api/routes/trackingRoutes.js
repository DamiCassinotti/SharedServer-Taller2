'use strict'

module.exports = function(app) {
	var trackingController = require('../controllers/trackingController');

	app.route('/tracking')
		.post(trackingController.add_tracking)
		.get(trackingController.get_trackings)

	app.route('/tracking/:trackingId')
		.get(trackingController.get_tracking)
		.put(trackingController.update_tracking)

};
