const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../server.js').bootstrapApp();
const loginController = require('../../api/controllers/loginController');
const loginMocks = require('../mocks/loginMocks');

describe('Login Routes', () => {
	let loginStub = null;

	beforeEach(() => {
		loginStub = sinon.stub(loginController, 'login').callsFake(() => new Promise((resolve, reject) => {resolve(loginMocks.controllerResponse)}));
	});

	afterEach(() => {
		loginStub.restore();
	});

	it('Correct login', (done) => {
		request(app)
			.post('/user/token')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.send(loginMocks.correctLogin)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(loginMocks.controllerResponse);
				done();
			});
	});

	it('Login without params', (done) => {
		request(app)
			.post('/user/token')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 2, message: 'Parametros erroneos'});
				done();
			});
	});

	it('Login with invalid credentials', (done) => {
		loginStub.restore();
		loginStub = sinon.stub(loginController, 'login').callsFake(() => new Promise((resolve, reject) => {resolve(null)}));
		request(app)
			.post('/user/token')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(401)
			.send(loginMocks.correctLogin)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 3, message: 'Invalid credentials'});
				done();
			});
	});

	it('Login with error', (done) => {
		loginStub.restore();
		loginStub = sinon.stub(loginController, 'login').callsFake(() => new Promise((resolve, reject) => {reject('testError')}));
		request(app)
			.post('/user/token')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.send(loginMocks.correctLogin)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Unexpected Error'});
				done();
			});
	});


});
