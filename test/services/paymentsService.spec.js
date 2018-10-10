const expect = require('chai').expect;
const paymentsService = require('../../api/services/paymentsService');

describe('Payment Service', () => {

	beforeEach(() => {

	});

	afterEach(() => {

	});

	it('Get Payments Methods', () => {
		var methods = paymentsService.getPaymentsMethods();

		expect(methods).not.to.be.undefined;
		expect(methods).to.be.an('array');
		expect(methods.length).to.equal(3);
	});

});
