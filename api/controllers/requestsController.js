const requestsService = require('../services/requestsService');

exports.reportRequest = (url, statusCode, elapsedTime) => {
	requestsService.reportRequest(url, statusCode, elapsedTime)
		.catch(error => console.log("error"));
}
