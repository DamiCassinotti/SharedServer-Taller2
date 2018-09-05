'use strict'

exports.createSimpleResponseOk = function(res, data) {
	res.status(200).json( {
		state: 'OK',
		data: data
	});
}

exports.createSimpleResponseError = function(res, msg) {
	res.status(200).json({
		state: 'ERROR',
		message: msg
	})
}
