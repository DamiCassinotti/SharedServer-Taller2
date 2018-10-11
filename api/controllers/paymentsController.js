const paymentsService = require('../services/paymentsService')

exports.addPayment = (payment) => {
	return new Promise((resolve, reject) => {
		paymentsService.addPayment(payment)
			.then(payment => {payment.status = 'PENDIENTE'; resolve(payment)})
			.catch(error => reject(error));
	})
}

exports.getPaymentsMethods = () => {
	return new Promise((resolve, reject) => {
		resolve(paymentsService.getPaymentsMethods());
	})
}
