const expect = require('chai').expect;
const paymentsController = require('../../api/controllers/paymentsController');
const request = require('supertest');
const sinon = require('sinon');
const paymentMethodsMock = require('../mocks/paymentMethodsMock');
const paymentMocks = require('../mocks/paymentMocks');
const app = require('../../server.js').bootstrapApp();

describe('Tracking Routes', () => {
	let addPaymentStub = null;
	let getPaymentMethodsStub = null;

	beforeEach(() => {
		addPaymentStub = sinon.stub(paymentsController, 'addPayment').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMocks.efectivo)}));
		getPaymentMethodsStub = sinon.stub(paymentsController, 'getPaymentsMethods').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMethodsMock)}));
	});

	afterEach(() => {
		addPaymentStub.restore();
		getPaymentMethodsStub.restore();
	});

	it('Add Payment', (done) => {
		request(app)
			.post('/payments')
			.set('Accept', 'applicacion/json')
			.send(paymentMocks.efectivo)
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(paymentMocks.efectivo);
				done();
			});
	});

	it('Add invalid Payment', (done) => {
		var payment = JSON.parse(JSON.stringify(paymentMocks.credito));
		payment.value = undefined;
		request(app)
			.post('/payments')
			.set('Accept', 'applicacion/json')
			.send(payment)
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Parametros erroneos'});
				done();
			});
	});

	it('Add Payment with error', (done) => {
		addPaymentStub.restore();
		addPaymentStub = sinon.stub(paymentsController, 'addPayment').callsFake(() => new Promise((resolve, reject) => {reject({message: 'Test error'})}));
		request(app)
			.post('/payments')
			.set('Accept', 'applicacion/json')
			.send(paymentMocks.debito)
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'Test error'});
				done();
			});
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
