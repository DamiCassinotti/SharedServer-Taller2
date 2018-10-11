exports.getServers = () => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select * from server;'
		}
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error));
	});
}

exports.addServer = (server) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'insert into server (createdBy, name) values ($1, $2) returning id, _rev, createdBy, createdTime, name, lastConnection',
			values: [server.createdBy, server.name]
		}
		client.query(query)
			.then(data => resolve(data.rows[0]))
			.catch(error => reject(error));
	})
}

exports.getServer = (idServer) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select * from server where id = $1;',
			values: [idServer]
		}
		client.query(query)
			.then(data => resolve(data.rows[0]))
			.catch(error => reject(error));
	});
}
