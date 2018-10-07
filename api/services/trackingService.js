exports.add_tracking = () => {
	const query = {
		text: 'INSERT INTO tracking DEFAULT VALUES RETURNING id, status, updateAt;'
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data.rows[0]))
			.catch(error => reject(error.message));
	});
}

exports.get_trackings = () => {
	const query = {
		text: 'SELECT * FROM tracking ORDER BY id DESC;'
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error.message));
	});
}

exports.get_tracking = (id_tracking) => {
	const query = {
		text: 'SELECT * FROM tracking WHERE id = $1;',
		values: [id_tracking]
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data.rows[0]))
			.catch(error => reject(error.message));
	});
}

exports.update_tracking = (id_tracking, status) => {
	const query = {
		text: 'UPDATE tracking SET status = $2, updateAt = current_timestamp WHERE id = $1 RETURNING id, status, updateAt;',
		values: [id_tracking, status]
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data.rows[0]))
			.catch(error => reject(error.message));
	});
}
