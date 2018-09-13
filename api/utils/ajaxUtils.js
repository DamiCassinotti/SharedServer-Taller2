'use strict'

exports.createSimpleResponseOk = function(data) {
	return {
		state: 'OK',
		data: data
	};
}

exports.createSimpleResponseError = function(msg) {
	return {
		state: 'ERROR',
		message: msg
	};
}
