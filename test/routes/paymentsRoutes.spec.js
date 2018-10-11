const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const paymentsController = require('../../api/controllers/paymentsController');
const paymentMethodsMock = require('../mocks/paymentMethodsMock');
const paymentMocks = require('../mocks/paymentMocks');
const app = require('../../server.js').bootstrapApp();

describe('Tracking Routes', () => {
	let addPaymentStub = null;
	let getPaymentsStub = null;
	let getPaymentStub = null;
	let updatePaymentStub = null;
	let getPaymentMethodsStub = null;

	beforeEach(() => {
		addPaymentStub = sinon.stub(paymentsController, 'addPayment').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMocks.efectivo)}));
		getPaymentsStub = sinon.stub(paymentsController, 'getPayments').callsFake(() => new Promise((resolve, reject) => {resolve([paymentMocks.efectivo])}));
		getPaymentStub = sinon.stub(paymentsController, 'getPayment').callsFake(() => new Promise((resolve, reject) => {resolve([paymentMocks.efectivo])}));
		updatePaymentStub = sinon.stub(paymentsController, 'updatePayment').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMocks.efectivo)}));
		getPaymentMethodsStub = sinon.stub(paymentsController, 'getPaymentsMethods').callsFake(() => new Promise((resolve, reject) => {resolve(paymentMethodsMock)}));
	});

	afterEach(() => {
		addPaymentStub.restore();
		getPaymentsStub.restore();
		getPaymentStub.restore();
		updatePaymentStub.restore();
		getPaymentMethodsStub.restore();
	});

	it('Get Payments', (done) => {
		request(app)
			.get('/payments')
			.set('Accept', 'applicacion/json')
			.send(paymentMocks.efectivo)
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal([paymentMocks.efectivo]);
				done();
			});
	});

	it('Get Payments with error', (done) => {
		getPaymentsStub.restore();
		getPaymentsStub = sinon.stub(paymentsController, 'getPayments').callsFake(() => new Promise((resolve, reject) => {reject({message: 'Test error'})}));
		request(app)
			.get('/payments')
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

	it('Get single payment', (done) => {
		request(app)
			.get('/payments/id/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal([paymentMocks.efectivo]);
				done();
			})
	});

	it('Get single payment Not found', (done) => {
		getPaymentStub.restore();
		getPaymentStub = sinon.stub(paymentsController, 'getPayment').callsFake(() => new Promise((resolve, reject) => {resolve([])}));
		request(app)
			.get('/payments/id/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Payment not found'});
				done();
			})
	});

	it('Get single payment with error', (done) => {
		getPaymentStub.restore();
		getPaymentStub = sinon.stub(paymentsController, 'getPayment').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));
		request(app)
			.get('/payments/id/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			})
	});

	it('Update payment', (done) => {
		request(app)
			.put('/payments/id/1')
			.send({status: 'CANCELADO'})
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(paymentMocks.efectivo);
				done();
			})
	});

	it('Update single payment without status', (done) => {
		request(app)
			.put('/payments/id/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 2, message: 'Parametros erroneos'});
				done();
			})
	});

	it('Update single payment Not found', (done) => {
		updatePaymentStub.restore();
		updatePaymentStub = sinon.stub(paymentsController, 'updatePayment').callsFake(() => new Promise((resolve, reject) => {resolve(null)}));
		request(app)
			.put('/payments/id/1')
			.send({status: 'CANCELADO'})
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Payment not found'});
				done();
			})
	});

	it('Update single payment with error', (done) => {
		updatePaymentStub.restore();
		updatePaymentStub = sinon.stub(paymentsController, 'updatePayment').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));
		request(app)
			.put('/payments/id/1')
			.send({status: 'CANCELADO'})
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			})
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
