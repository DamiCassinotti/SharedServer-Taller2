const expect = require('chai').expect;
const paymentsService = require('../../api/services/paymentsService');
const paymentsController = require('../../api/controllers/paymentsController');
const sinon = require('sinon');
const paymentMethodsMock = require('../mocks/paymentMethodsMock');
const paymentMocks = require('../mocks/paymentMocks');

describe('Payment  Controller', () => {
	let addPaymentStub = null;
	let getPaymentsMethodsStub = null;

	beforeEach(() => {
		addPaymentStub = sinon.stub(paymentsService, 'addPayment').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMocks.efectivo)}));
		getPaymentsMethodsStub = sinon.stub(paymentsService, 'getPaymentsMethods').callsFake(() => paymentMethodsMock);
	});

	afterEach(() => {
		addPaymentStub.restore();
		getPaymentsMethodsStub.restore();
	});

	it('Add Payment', (done) => {
		var newPayment = JSON.parse(JSON.stringify(paymentMocks.efectivo));
		newPayment.status = 'PENDIENTE';
		paymentsController.addPayment(paymentMocks.efectivo)
			.then(payment => {
				expect(payment).to.deep.equal(newPayment);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Add Payment with error', (done) => {
		addPaymentStub.restore();
		addPaymentStub = sinon.stub(paymentsService, 'addPayment').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		paymentsController.addPayment(paymentMocks.efectivo)
			.then(payment => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).not.to.be.undefined;
				expect(err).to.deep.equal('test error');
				done();
			});
	});

	it('Get Payment Methods', (done) => {
		paymentsController.getPaymentsMethods()
			.then(methods => {
				expect(methods).to.deep.equal(paymentMethodsMock);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

});
