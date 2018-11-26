const appServerService = require('../services/appServerService');
const appServerUtils = require('../utils/appServerUtils');

exports.getServers = () => {
	return new Promise((resolve, reject) => {
		appServerService.getServers()
			.then(servers => resolve(appServerUtils.createServersReponseWithMetadata(servers)))
			.catch(error => reject(error));
	})
}

exports.addServer = (server) => {
	return new Promise((resolve, reject) => {
		appServerService.addServer(server)
			.then(newServer => resolve(appServerUtils.createServerReponseWithMetadataAndUnexpiringToken(newServer)))
			.catch(error => reject(error));
	})
}

exports.getServer = (idServer) => {
	return new Promise((resolve, reject) => {
		appServerService.getServer(idServer)
			.then(newServer => resolve(appServerUtils.createServerReponseWithMetadata(newServer)))
			.catch(error => reject(error));
	});
}

exports.updateServer = (idServer, server) => {
	return new Promise((resolve, reject, then) => {
		appServerService.updateServer(idServer, server)
			.then(newServer => resolve(appServerUtils.createServerReponseWithMetadata(newServer)))
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

exports.resetToken = (idServer) => {
	return new Promise((resolve, reject) => {
		appServerService.getServer(idServer)
			.then(server => resolve(appServerUtils.createServerReponseWithMetadataAndToken(server)))
			.catch(error => reject(error));
	})
}
