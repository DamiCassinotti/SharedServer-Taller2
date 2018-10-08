exports.add_tracking = () => {
	const query = {
		text: 'INSERT INTO tracking DEFAULT VALUES RETURNING id, status, updateAt;'
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(async (data) => {
				var tracking = data.rows[0];
				await add_tracking_to_hist(tracking);
				resolve(tracking);
			})
			.catch(error => reject(error));
	});
}

exports.get_trackings = () => {
	const query = {
		text: 'SELECT * FROM tracking ORDER BY id DESC;'
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error));
	});
}

exports.get_tracking = (id_tracking) => {
	const query = {
		text: 'SELECT t.id, th.status, th.updateat ' +
		 		'FROM tracking t join tracking_hist th on th.tracking_id = t.id ' +
				'WHERE t.id = $1;',
		values: [id_tracking]
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error));
	});
}

exports.update_tracking = (id_tracking, status) => {
	const query = {
		text: 'UPDATE tracking SET status = $2, updateAt = current_timestamp WHERE id = $1 RETURNING id, status, updateAt;',
		values: [id_tracking, status]
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(async (data) => {
				var tracking = data.rows[0];
				await add_tracking_to_hist(tracking);
				resolve(tracking);
			})
			.catch(error => reject(error));
	});
}

var add_tracking_to_hist = (tracking) => {
	const query = {
		text: 'INSERT INTO tracking_hist (tracking_id, status, updateat) values ($1, $2, $3);',
		values: [tracking.id, tracking.status, tracking.updateat]
	};
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data))
			.catch(error => reject(error))
	})
}
