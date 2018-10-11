const expect = require('chai').expect;
const paymentsService = require('../../api/services/paymentsService');
const paymentsController = require('../../api/controllers/paymentsController');
const sinon = require('sinon');
const paymentMethodsMock = require('../mocks/paymentMethodsMock');
const paymentMocks = require('../mocks/paymentMocks');

describe('Payment  Controller', () => {
	let addPaymentStub = null;
	let getPaymentsStub = null;
	let getPaymentStub = null;
	let getPaymentsMethodsStub = null;

	beforeEach(() => {
		addPaymentStub = sinon.stub(paymentsService, 'addPayment').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMocks.efectivo)}));
		getPaymentsStub = sinon.stub(paymentsService, 'getPayments').callsFake(() => new Promise((resolve, reject) => {resolve([paymentMocks.serviceResponseDebito, paymentMocks.serviceResponseEfectivo, paymentMocks.serviceResponseCredito])}));
		getPaymentStub = sinon.stub(paymentsService, 'getPayment').callsFake(() => new Promise((resolve, reject) => {resolve([paymentMocks.serviceResponseEfectivo])}));
		getPaymentsMethodsStub = sinon.stub(paymentsService, 'getPaymentsMethods').callsFake(() => paymentMethodsMock);
	});

	afterEach(() => {
		addPaymentStub.restore();
		getPaymentsStub.restore();
		getPaymentStub.restore();
		getPaymentsMethodsStub.restore();
	});

	it('Get Payments', (done) => {
		paymentsController.getPayments()
			.then(payments => {
				expect(payments).to.be.an('array');
				expect(payments.length).to.equal(3);
				expect(payments[0]).to.deep.equal(paymentMocks.debito);
				expect(payments[1]).to.deep.equal(paymentMocks.efectivo);
				expect(payments[2]).to.deep.equal(paymentMocks.credito);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Add Payment with error', (done) => {
		getPaymentsStub.restore();
		getPaymentsStub = sinon.stub(paymentsService, 'getPayments').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		paymentsController.getPayments()
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

	it('Get single payment', (done) => {
		paymentsController.getPayment(1)
			.then(payment => {
				expect(payment).to.deep.equal([paymentMocks.efectivo]);
				done();
			})
			.catch(err => {
				console.log(err);
				expect(true).to.equal(false);
				done();
			});
	});

	it('Get single payment with error', (done) => {
		getPaymentStub.restore();
		getPaymentStub = sinon.stub(paymentsService, 'getPayment').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		paymentsController.getPayment(1)
			.then(payment => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
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
