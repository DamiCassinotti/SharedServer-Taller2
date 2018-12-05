exports.convertPaymentsToModel = (payments) => {
	return payments.map(convertPaymentToModel);
}

var convertPaymentToModel = (payment) => {
	if (!payment) return;
	console.log(payment.updateat);
	var convertedPayment = {
		transaction_id : payment.transaction_id,
		currency: payment.currency,
		value: payment.value,
		paymentMethod: {
			payment_method: payment.payment_method
		},
		status: payment.status,
		updateat: payment.updateat
	}
	if (payment.expiration_date)
		convertedPayment.paymentMethod.expiration_date = payment.expiration_date;
	if (payment.card_number)
		convertedPayment.paymentMethod.card_number = payment.card_number;
	if (payment.cardholder_name)
		convertedPayment.paymentMethod.cardholder_name = payment.cardholder_name;
	if (payment.security_code)
		convertedPayment.paymentMethod.security_code = payment.security_code;
	return convertedPayment;
}

exports.convertPaymentToModel = convertPaymentToModel;
