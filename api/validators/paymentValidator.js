const paymentMethods = require('../enums/paymentMethods');

exports.isValidPayment = (payment) => {
	if (!payment || !payment.transaction_id || !payment.currency || !payment.value ||
		isNaN(payment.value) || !payment.paymentMethod || !isValidPaymentMethod(payment.paymentMethod))
		return false;
	return true;
}

function isValidPaymentMethod(paymentMethod) {
	if (!paymentMethod.method || !paymentMethods.methods.isDefined(paymentMethod.method))
		return false;
	if (paymentMethods.isTarjeta(paymentMethod.method))
		if (!paymentMethod.expiration_year || !paymentMethod.expiration_month || !paymentMethod.number)
			return false;
	return true;
}
