
exports.createServerReponse = (server) => {
	return {
		metadata: {
			version: config.version
		},
		server: {
			server: {
				id: server.id,
				_rev: server._rev,
				createdBy: server.createdby,
				createdTime: server.createdtime,
				name: server.name,
				lastConnection: server.lastconnection
			},
			token: {
				expiresAt: 0,
				token: "12345678"
			}
		}
	}
}
