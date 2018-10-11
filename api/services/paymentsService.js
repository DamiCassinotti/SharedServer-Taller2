const paymentMethods = require('../enums/paymentMethods');

exports.addPayment = (payment) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'INSERT INTO PAYMENT (transaction_id, currency, value, payment_method) VALUES ($1, $2, $3, $4);',
			values: [payment.transaction_id, payment.currency, payment.value, payment.paymentMethod.method]
		};
		client.query(query)
			.then(async (data) => {
				if (paymentMethods.isTarjeta(payment.paymentMethod.method))
					await addPaymentMethodOfPayment(payment);
				resolve(payment)
			})
			.catch(error => reject(error));
	})
}

exports.getPaymentsMethods = () => {
	return paymentMethods.getPaymentsMethods();
}

var addPaymentMethodOfPayment = (payment) => {
	var query = {
		text: 'INSERT INTO PAYMENT_METHOD (transaction_id, expiration_month, expiration_year, number) VALUES ($1, $2, $3, $4);',
		values: [payment.transaction_id, payment.paymentMethod.expiration_month, payment.paymentMethod.expiration_year, payment.paymentMethod.number]
	};
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data))
			.catch(error => reject(error))
	});
}
