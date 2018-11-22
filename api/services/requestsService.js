exports.reportRequest = (url, method, statusCode, elapsedTime) => {
	var query = {
		text: 'insert into requests (url, method, "statusCode", "elapsedTime") values ($1, $2, $3, $4)',
		values: [url, method, statusCode, elapsedTime]
	}
	return client.query(query);
}

exports.getReport = () => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select url, method, "statusCode", count(1) as total, avg("elapsedTime"), min("elapsedTime"), max("elapsedTime") from requests group by url, method, "statusCode" order by url, method, "statusCode" asc',
		}
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error));
	});
}
