exports.reportRequest = (url, statusCode, elapsedTime) => {
	var query = {
		text: 'insert into requests (url, "statusCode", "elapsedTime") values ($1, $2, $3)',
		values: [url, statusCode, elapsedTime]
	}
	return client.query(query);
}
