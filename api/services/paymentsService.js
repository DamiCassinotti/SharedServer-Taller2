exports.getPayments = () => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select p.*, pm.expiration_date, pm.card_number, pm.cardholder_name, pm.security_code from payment p left join payment_method pm on p.transaction_id = pm.transaction_id;',
		}
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error));
	});
}

exports.addPayment = (payment) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'INSERT INTO PAYMENT (transaction_id, currency, value, payment_method) VALUES ($1, $2, $3, $4);',
			values: [payment.transaction_id, payment.currency, payment.value, payment.paymentMethod.payment_method]
		};
		client.query(query)
			.then(async (data) => {
				var isTarjeta = await isPaymentMethodTarjeta(payment.paymentMethod.payment_method);
				if (isTarjeta)
					await addPaymentMethodOfPayment(payment);
				resolve(payment);
			})
			.catch(error => reject(error));
	})
}

var getPayment = (idPayment) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'select p.*, pm.expiration_date, pm.card_number, pm.cardholder_name, pm.security_code from payment p left join payment_method pm on p.transaction_id = pm.transaction_id ' +
				'where p.transaction_id = $1;',
			values: [idPayment]
		}
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error));
	});
}

exports.getPayment = getPayment;

exports.updatePayment = (idPayment, status) => {
	return new Promise((resolve, reject) => {
		var query = {
			text: 'update payment set status = $2 where transaction_id = $1;',
			values: [idPayment, status]
		}
		client.query(query)
			.then(async data => {
				var updatedPayment = await getPayment(idPayment);
				resolve(updatedPayment[0]);
			})
			.catch(error => reject(error));
	});
}

exports.getPaymentsMethods = () => {
	var query = {
		text: 'select * from payment_methods;'
	}
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data.rows))
			.catch(error => reject(error));
	});
}

var addPaymentMethodOfPayment = (payment) => {
	var query = {
		text: 'INSERT INTO PAYMENT_METHOD (transaction_id, expiration_date, card_number, security_code, cardholder_name) VALUES ($1, $2, $3, $4, $5);',
		values: [payment.transaction_id, payment.paymentMethod.expiration_date, payment.paymentMethod.card_number, payment.paymentMethod.security_code, payment.paymentMethod.cardholder_name]
	};
	return new Promise((resolve, reject) => {
		client.query(query)
			.then(data => resolve(data))
			.catch(error => reject(error));
	});
}

var isPaymentMethodTarjeta = async (paymentMethod) => {
	var query = {
		text: 'select type from payment_methods where _id = $1',
		values: [paymentMethod]
	}
	var data = await client.query(query);
	if (data.rows.length > 0 && data.rows[0].type == 1)
		return true;
	return false;
}

exports.isPaymentMethodTarjeta = isPaymentMethodTarjeta;
