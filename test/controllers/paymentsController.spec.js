const expect = require('chai').expect;
const paymentsService = require('../../api/services/paymentsService');
const paymentsController = require('../../api/controllers/paymentsController');
const sinon = require('sinon');
const paymentMethodsMock = require('../mocks/paymentMethodsMock');

describe('Payment  Controller', () => {
	let getPaymentsMethodsStub = null;

	beforeEach(() => {
		getPaymentsMethodsStub = sinon.stub(paymentsService, 'getPaymentsMethods').callsFake(() => paymentMethodsMock);
	});

	afterEach(() => {
		getPaymentsMethodsStub.restore();
	});

	it('Get Payment Methods', (done) => {
		paymentsController.getPaymentsMethods()
			.then(methods => {
				expect(methods).to.deep.equal(paymentMethodsMock);
				done();
			})
			.catch(err => {
				console.log(err);
				expect(true).to.equal(false);
				done();
			});
	});

});
