const expect = require('chai').expect;
const paymentsController = require('../../api/controllers/paymentsController');
const request = require('supertest');
const sinon = require('sinon');
const paymentMethodsMock = require('../mocks/paymentMethodsMock');
const app = require('../../server.js').bootstrapApp();

describe('Tracking Routes', () => {
	let getPaymentMethodsStub = null;

	beforeEach(() => {
		getPaymentMethodsStub = sinon.stub(paymentsController, 'getPaymentsMethods').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMethodsMock)}));
	});

	afterEach(() => {
		getPaymentMethodsStub.restore();
	});

	it('Get Payment Methods', (done) => {
		request(app)
			.get('/payments/methods')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(paymentMethodsMock);
				done();
			});
	});

	it('Get Payment Methods with unexpected error', (done) => {
		getPaymentMethodsStub.restore();
		getPaymentMethodsStub = sinon.stub(paymentsController, 'getPaymentsMethods').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));

		request(app)
			.get('/payments/methods')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			});
	});
});
