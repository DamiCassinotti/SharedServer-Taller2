exports.createServersReponse = (servers) => {
	var response = {
		metadata: {
			version: config.version,
			total: servers.length
		}
	}
	response.server = servers.map(mapServer);
	return response;
}

exports.createServerReponse = (server) => {
	var response = {
		metadata: {
			version: config.version
		},
		server: {
			token: {
				expiresAt: 0,
				token: "12345678"
			}
		}
	}
	response.server.server = mapServer(server);
	return response;
}

var mapServer = (server) => {
	return {
		id: server.id,
		_rev: server._rev,
		createdBy: server.createdby,
		createdTime: server.createdtime,
		name: server.name,
		lastConnection: server.lastconnection
	}
}
