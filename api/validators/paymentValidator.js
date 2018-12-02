exports.isValidPayment = (payment) => {
	if (!payment || !payment.transaction_id || !payment.currency || !payment.value ||
		isNaN(payment.value) || !payment.paymentMethod || !payment.paymentMethod.payment_method)
		return false;
	return true;
}

exports.isValidPaymentMethodTarjeta = (paymentMethod) => {
	if (!paymentMethod.expiration_date || !paymentMethod.cardholder_name || !paymentMethod.card_number || !paymentMethod.security_code)
		return false;
	return true;
}
