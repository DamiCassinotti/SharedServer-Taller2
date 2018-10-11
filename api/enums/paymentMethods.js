var Enum = require('enum');

var paymentMethods = new Enum({'EFECTIVO': 'Efectivo', 'T_CREDITO': 'Tarjeta de Credito', 'T_DEBITO': 'Tarjeta de Debito'});

exports.getPaymentsMethods = () => {
	return paymentMethods.enums.map(function(enumItem) {
		return {
			id: enumItem.value,
			description: enumItem.key
		}
	});
}

exports.methods = paymentMethods;

exports.isTarjeta = (method) => {
	return paymentMethods.T_CREDITO.is(method) || paymentMethods.T_DEBITO.is(method);
}
