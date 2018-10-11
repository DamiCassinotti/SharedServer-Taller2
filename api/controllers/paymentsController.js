const paymentsService = require('../services/paymentsService');
const paymentUtils = require('../utils/paymentUtils');

exports.getPayments = () => {
	return new Promise((resolve, reject) => {
		paymentsService.getPayments()
			.then(payments => resolve(paymentUtils.convertPaymentsToModel(payments)))
			.catch(error => reject(error));
	});
}

exports.addPayment = (payment) => {
	return new Promise((resolve, reject) => {
		paymentsService.addPayment(payment)
			.then(payment => {payment.status = 'PENDIENTE'; resolve(payment)})
			.catch(error => reject(error));
	})
}

exports.getPayment = (idPayment) => {
	return new Promise((resolve, reject) => {
		paymentsService.getPayment(idPayment)
			.then(payment => resolve(paymentUtils.convertPaymentsToModel(payment)))
			.catch(error => reject(error));
	});
}

exports.updatePayment = (idPayment, status) => {
	return new Promise((resolve, reject) => {
		paymentsService.updatePayment(idPayment, status)
			.then(payment => resolve(paymentUtils.convertPaymentToModel(payment))) 
			.catch(error => reject(error));
	});
}

exports.getPaymentsMethods = () => {
	return new Promise((resolve, reject) => {
		resolve(paymentsService.getPaymentsMethods());
	})
}
