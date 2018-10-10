const paymentsService = require('../services/paymentsService')

exports.getPaymentsMethods = () => {
	return new Promise((resolve, reject) => {
		resolve(paymentsService.getPaymentsMethods());
	})
}
