const appServerService = require('../services/appServerService');
const appServerUtils = require('../utils/appServerUtils');

exports.getServers = () => {
	return new Promise((resolve, reject) => {
		appServerService.getServers()
			.then(servers => resolve(appServerUtils.createServersReponse(servers)))
			.catch(error => reject(error));
	})
}

exports.addServer = (server) => {
	return new Promise((resolve, reject) => {
		appServerService.addServer(server)
			.then(newServer => resolve(appServerUtils.createServerReponse(newServer)))
			.catch(error => reject(error));
	})
}
