'use strict'

var ajaxUtils = require('../utils/ajaxUtils.js')

exports.executeQuery = function(query, res) {
	client.query(query)
		.then(data => ajaxUtils.createSimpleResponseOk(res, data.rows))
		.catch(e => ajaxUtils.createSimpleResponseError(res, e.message));
}
