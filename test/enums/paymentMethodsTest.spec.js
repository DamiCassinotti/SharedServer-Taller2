const expect = require('chai').expect;
const paymentMethods = require('../../api/enums/paymentMethods');
const methodsMock = require('../mocks/paymentMethodsMock')

describe('Payment Methods', () => {
	it('Get Payment Methods', () => {
		var methods = paymentMethods.getPaymentsMethods();
		expect(methods).to.be.an('array');
		expect(methods.length).to.be.equal(3);
		expect(methods).to.deep.equal(methodsMock);
	});

});
