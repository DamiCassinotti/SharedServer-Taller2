const expect = require('chai').expect;
const paymentsService = require('../../api/services/paymentsService');
const paymentMocks = require('../mocks/paymentMocks');
const app = require('../../server.js').bootstrapApp();
const pg = require('pg');

describe('Payment Service', () => {

	beforeEach((done) => {
		client = new pg.Client(config.database.testing);
		client.connect();
		client.query('BEGIN;')
			.then(data => {
				done();
			})
			.catch(err => {
				throw err;
				done();
			});
	});

	afterEach((done) => {
		client.query('ROLLBACK;')
			.then(data => {
				client.end();
				done();
			})
			.catch(err => {
				client.end();
				done();
			});
	});

	it('Add new payment Efectivo', async () => {
		var payment = await paymentsService.addPayment(paymentMocks.efectivo);

		expect(payment).not.to.be.undefined;
		expect(payment).to.deep.equal(paymentMocks.efectivo);
	});

	it('Add new payment Credito', async () => {
		var payment = await paymentsService.addPayment(paymentMocks.credito);

		expect(payment).not.to.be.undefined;
		expect(payment).to.deep.equal(paymentMocks.credito);
	});

	it('Add new payment Debido', async () => {
		var payment = await paymentsService.addPayment(paymentMocks.debito);

		expect(payment).not.to.be.undefined;
		expect(payment).to.deep.equal(paymentMocks.debito);
	});

	it('Select all Payments', async () => {
		var payments = await paymentsService.getPayments();

		expect(payments).to.not.be.undefined;
		expect(payments).to.be.an('array').that.is.empty;
	});

	it('Select all payments after inserting', async () => {
		var payment = await paymentsService.addPayment(paymentMocks.debito);

		var payments = await paymentsService.getPayments();

		expect(payments).to.not.be.undefined;
		expect(payments).to.be.an('array');
		expect(payments.length).to.equal(1);
		expect(payments[0]).to.deep.equal(paymentMocks.serviceResponseDebito);
	});

	it('Select one payment after inserting', async () => {
		var payment = await paymentsService.addPayment(paymentMocks.debito);

		var samePayment = await paymentsService.getPayment(paymentMocks.debito.transaction_id);

		expect(samePayment).to.not.be.undefined;
		expect(samePayment).to.be.an('array');
		expect(samePayment.length).to.equal(1);
		expect(samePayment[0]).to.deep.equal(paymentMocks.serviceResponseDebito);
	});

	it('Select one payment without id throws error', (done) => {
		paymentsService.getPayment()
			.then(payment => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.not.be.undefined;
				done();
			});
	});

	it('Select one payment without inserting return empty array', async () => {
		var samePayment = await paymentsService.getPayment(paymentMocks.debito.transaction_id);

		expect(samePayment).to.not.be.undefined;
		expect(samePayment).to.be.an('array').that.is.empty;;
	});

	it('Get Payments Methods', () => {
		var methods = paymentsService.getPaymentsMethods();

		expect(methods).not.to.be.undefined;
		expect(methods).to.be.an('array');
		expect(methods.length).to.equal(3);
	});

});
