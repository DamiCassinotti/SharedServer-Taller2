const expect = require('chai').expect;
const paymentMethods = require('../../api/enums/paymentMethods')

describe('Payment Methods', () => {
	it('Get Payment Methods', () => {
		var methods = paymentMethods.getPaymentsMethods();
		expect(methods).to.be.an('array');
		expect(methods.length).to.be.equal(3);
		expect(methods).to.deep.equal([{
			id: 0,
			description: 'Efectivo'
		}, {
			id: 1,
			description: 'Tarjeta de Credito'
		}, {
			id: 2,
			description: 'Tarjeta de Debito'
		}]);
	});

});
