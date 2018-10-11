const paymentMethods = require('../enums/paymentMethods');

exports.convertPaymentsToModel = (payments) => {
	return payments.map(convertPaymentToModel);
}

var convertPaymentToModel = (payment) => {
	if (!payment) return;
	var convertedPayment = {
		transaction_id : payment.transaction_id,
		currency: payment.currency,
		value: payment.value,
		paymentMethod: {
			method: payment.payment_method
		},
		status: payment.status
	}
	if (paymentMethods.isTarjeta(payment.payment_method)) {
		convertedPayment.paymentMethod.expiration_month = payment.expiration_month;
		convertedPayment.paymentMethod.expiration_year = payment.expiration_year;
		convertedPayment.paymentMethod.number = payment.number;
	}
	return convertedPayment;
}

exports.convertPaymentToModel = convertPaymentToModel;
