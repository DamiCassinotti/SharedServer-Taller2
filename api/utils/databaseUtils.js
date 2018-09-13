'use strict'

var ajaxUtils = require('../utils/ajaxUtils.js')

exports.executeQuery = function(query, res) {
	client.query(query)
		.then(data => res.status(200).json(ajaxUtils.createSimpleResponseOk(data.rows)))
		.catch(e => res.status(200).json(ajaxUtils.createSimpleResponseError(e.message)));
}
