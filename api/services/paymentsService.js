const paymentMethods = require('../enums/paymentMethods');

exports.getPaymentsMethods = () => {
	return paymentMethods.getPaymentsMethods();
}
