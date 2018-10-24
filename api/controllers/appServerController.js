const appServerService = require('../services/appServerService');
const appServerUtils = require('../utils/appServerUtils');

exports.getServers = () => {
	return new Promise((resolve, reject) => {
		appServerService.getServers()
			.then(servers => resolve(appServerUtils.createGetServersReponse(servers)))
			.catch(error => reject(error));
	})
}

exports.addServer = (server) => {
	return new Promise((resolve, reject) => {
		appServerService.addServer(server)
			.then(newServer => resolve(appServerUtils.createAddServerReponse(newServer)))
			.catch(error => reject(error));
	})
}

exports.getServer = (idServer) => {
	return new Promise((resolve, reject) => {
		appServerService.getServer(idServer)
			.then(newServer => resolve(appServerUtils.createGetServerReponse(newServer)))
			.catch(error => reject(error));
	})
}

exports.deleteServer = (idServer) => {
	return new Promise((resolve, reject) => {
		appServerService.deleteServer(idServer)
			.then(deletedServers => resolve(deletedServers))
			.catch(error => reject(error))
	})
}
