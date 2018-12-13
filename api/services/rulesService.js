exports.getRules = () => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select * from rules order by position asc;'
		}
		client.query(query)
			.then((data) => resolve(data.rows))
			.catch((err) => reject(err));
	});
}
