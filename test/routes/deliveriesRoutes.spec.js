const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../server.js').bootstrapApp();
const deliveriesController = require('../../api/controllers/deliveriesController');
const loginService = require('../../api/services/loginService');
const deliveriesMocks = require('../mocks/deliveriesMocks');

describe('Deliveries Routes', () => {
	let estimateStub = null;
	let loginStub = null;
	let token = null;

	beforeEach((done) => {
		estimateStub = sinon.stub(deliveriesController, 'estimate').callsFake(() => new Promise((resolve, reject) => {resolve(deliveriesMocks.response)}));
		loginStub = sinon.stub(loginService, 'isValidLogin').callsFake(() => new Promise((resolve, reject) => {resolve(true)}));
		request(app)
			.post('/user/token')
			.send({username: 'administrator', password: 'password'})
			.end((err, res) => {
				token = res.body.token.token;
				done();
			});
	});

	afterEach(() => {
		estimateStub.restore();
		loginStub.restore();
	});

	it('Correct estimation', (done) => {
		request(app)
			.post('/deliveries/estimate')
			.set('Accept', 'applicacion/json')
			.set('Authorization', 'Bearer ' + token)
			.expect('Content-Type', /json/)
			.expect(201)
			.send(deliveriesMocks.request)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(deliveriesMocks.response);
				done();
			});
	});

	it('estimation without token gets unauthorized', (done) => {
		request(app)
			.post('/deliveries/estimate')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(401)
			.send(deliveriesMocks.request)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'Unauthorized Access'});
				done();
			});
	});

	it('estimation without params gets Parametros erroneos', (done) => {
		request(app)
			.post('/deliveries/estimate')
			.set('Accept', 'applicacion/json')
			.set('Authorization', 'Bearer ' + token)
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 2, message: 'Parametros erroneos'});
				done();
			});
	});

	it('estimation with error gets Unexpected error', (done) => {
		estimateStub.restore();
		estimateStub = sinon.stub(deliveriesController, 'estimate').callsFake(() => new Promise((resolve, reject) => {reject('testError')}));
		request(app)
			.post('/deliveries/estimate')
			.set('Accept', 'applicacion/json')
			.set('Authorization', 'Bearer ' + token)
			.expect('Content-Type', /json/)
			.expect(500)
			.send(deliveriesMocks.request)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Unexpected Error'});
				done();
			});
	});


});
