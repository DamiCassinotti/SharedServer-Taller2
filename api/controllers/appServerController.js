const appServerService = require('../services/appServerService');
const appServerUtils = require('../utils/appServerUtils');
const requestUtils = require('../utils/requestUtils');

exports.getServers = () => {
	return new Promise((resolve, reject) => {
		appServerService.getServers()
			.then(servers => resolve(appServerUtils.createServersReponseWithMetadata(servers)))
			.catch(error => reject(error));
	});
}

exports.addServer = (server) => {
	return new Promise((resolve, reject) => {
		appServerService.addServer(server)
			.then(newServer => resolve(appServerUtils.createServerReponseWithMetadataAndUnexpiringToken(newServer)))
			.catch(error => reject(error));
	});
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
	});
}

exports.deleteServer = (idServer) => {
	return new Promise((resolve, reject) => {
		appServerService.deleteServer(idServer)
			.then(deletedServers => resolve(deletedServers))
			.catch(error => reject(error))
	});
}

exports.resetToken = (idServer) => {
	return new Promise((resolve, reject) => {
		appServerService.getServer(idServer)
			.then(server => resolve(appServerUtils.createServerReponseWithMetadataAndToken(server)))
			.catch(error => reject(error));
	});
}

exports.getServersStatus = () => {
	return new Promise(async (resolve, reject) => {
		try {
			var servers = await appServerService.getServers();
		} catch(error) {
			reject(error);
		}
		var status = [];
		for (var i = 0; i < servers.length; i++) {
			var server = servers[i];
			try {
				var response = await requestUtils.makeSimpleRequest("http://" + server.name + "/ping");
				serverStatus = 'OK';
			} catch(e) {
				serverStatus = 'ERROR';
			}
			status.push({
				name: server.name,
				status: serverStatus
			})
		}
		resolve(status);
	});
}
