const appServerService = require('../services/appServerService');
const appServerUtils = require('../utils/appServerUtils');

exports.addServer = (server) => {
	return new Promise((resolve, reject) => {
		appServerService.addServer(server)
			.then(newServer => resolve(appServerUtils.createServerReponse(newServer)))
			.catch(error => reject(error));
	})
}
