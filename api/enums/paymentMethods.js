var Enum = require('enum');

var paymentMethods = new Enum({'Efectivo': 0, 'Tarjeta de Credito': 1, 'Tarjeta de Debito': 2});

exports.getPaymentsMethods = () => {
	return paymentMethods.enums.map(function(enumItem) {
		return {
			id: enumItem.value,
			description: enumItem.key
		}
	});
}
