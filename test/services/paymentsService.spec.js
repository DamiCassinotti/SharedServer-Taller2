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

	it('Get Payments Methods', () => {
		var methods = paymentsService.getPaymentsMethods();

		expect(methods).not.to.be.undefined;
		expect(methods).to.be.an('array');
		expect(methods.length).to.equal(3);
	});

});
