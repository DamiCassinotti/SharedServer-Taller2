exports.isValidLogin = (username, password) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select count(1) from usuario where username = $1 and password = $2',
			values: [username, password]
		}
		client.query(query)
			.then(data => {
				resolve(data.rows[0].count == 1);
			})
			.catch(err => reject(err));
	})
}
