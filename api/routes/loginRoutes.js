'use strict'
module.exports = function(app) {
	var loginController = require('../controllers/loginController');

	app.route('/user/token')
		.post(loginController.login)

};
