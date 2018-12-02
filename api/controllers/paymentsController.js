const paymentsService = require('../services/paymentsService');
const paymentUtils = require('../utils/paymentUtils');
const paymentValidator = require('../validators/paymentValidator');

exports.getPayments = () => {
	return new Promise((resolve, reject) => {
		paymentsService.getPayments()
			.then(payments => resolve(paymentUtils.convertPaymentsToModel(payments)))
			.catch(error => reject(error));
	});
}

exports.addPayment = (payment) => {
	return new Promise(async (resolve, reject) => {
		var isTarjeta = await paymentsService.isPaymentMethodTarjeta(payment.paymentMethod.payment_method);
		if (isTarjeta && !paymentValidator.isValidPaymentMethodTarjeta(payment.paymentMethod))
			reject({name: "ParametersError"});
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
		paymentsService.getPaymentsMethods()
			.then(methods => resolve(methods))
			.catch(error => reject(error));
	})
}
