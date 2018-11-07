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
			text: 'insert into server (createdBy, name) values ($1, $2) returning id, _rev, createdBy, createdTime, name, lastConnection;',
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

exports.updateServer = (idServer, server) => {
	return new Promise(async (resolve, reject) => {
		var serverExists = await client.query('select count(1) from server where id = $1', [idServer]);
		if (serverExists.rows[0].count == 0)
			return resolve();
		var isAbleToUpdate = await client.query('select count(1) from server where id = $1 and _rev = $2', [idServer, server._rev]);
		if (isAbleToUpdate.rows[0].count == 0)
			return reject({name: 'BadRev'});
		var query = {
			text: 'update server set name = $2, _rev = $3 where id = $1 returning id, _rev, createdBy, createdTime, name, lastConnection;',
			values: [idServer, server.name, server._rev + 1]
		}
		client.query(query)
			.then(data => resolve(data.rows[0]))
			.catch(error => reject(error));
	});
}

exports.deleteServer = (idServer) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'delete from server where id = $1;',
			values: [idServer]
		}
		client.query(query)
			.then(data => resolve(data.rowCount))
			.catch(error => reject(error));
	});
}
