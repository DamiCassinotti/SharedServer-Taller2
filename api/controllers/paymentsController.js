const paymentsService = require('../services/paymentsService')

exports.addPayment = (payment) => {
	return new Promise((resolve, reject) => {
		paymentsService.addPayment(payment)
			.then(payment => resolve(payment))
			.catch(error => reject(error));
	})
}

exports.getPaymentsMethods = () => {
	return new Promise((resolve, reject) => {
		resolve(paymentsService.getPaymentsMethods());
	})
}
