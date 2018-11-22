const requestsService = require('../services/requestsService');

exports.reportRequest = (url, method, statusCode, elapsedTime) => {
	requestsService.reportRequest(url, method, statusCode, elapsedTime)
		.catch(error => console.log("error"));
}

exports.getReport = () => {
	return new Promise((resolve, reject) => {
		requestsService.getReport()
			.then(data => resolve(data))
			.catch(error => reject(data));
	});
}
