'use strict'
module.exports = function(app) {
	var pingController = require('../controllers/pingController');

	app.route('/ping')
		.get(pingController.ping)

};
