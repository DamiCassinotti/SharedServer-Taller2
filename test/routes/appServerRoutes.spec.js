const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../server.js').bootstrapApp();
const appServerController = require('../../api/controllers/appServerController');
const serverRequestMock = require('../mocks/serverRequestMock');
const serverResponseMock = require('../mocks/serverResponseMock');

describe('App Server Routes', () => {
	let addServerStub = null;

	beforeEach(() => {
		addServerStub = sinon.stub(appServerController, 'addServer').callsFake(() => new Promise((resolve, reject) => {resolve(serverResponseMock.controllerResponse)}));
	});

	afterEach(() => {
		addServerStub.restore();
	});

	it('Add Server', (done) => {
		request(app)
			.post('/servers')
			.set('Accept', 'applicacion/json')
			.send(serverRequestMock.alta)
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(serverResponseMock.controllerResponse);
				done();
			});
	});

	it('Add invalid Server', (done) => {
		var server = JSON.parse(JSON.stringify(serverRequestMock.alta));
		server.name = undefined;
		request(app)
			.post('/servers')
			.set('Accept', 'applicacion/json')
			.send(server)
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Parametros erroneos'});
				done();
			});
	});

	it('Add Server with error', (done) => {
		addServerStub.restore();
		addServerStub = sinon.stub(appServerController, 'addServer').callsFake(() => new Promise((resolve, reject) => {reject({message: 'Test error'})}));
		request(app)
			.post('/servers')
			.set('Accept', 'applicacion/json')
			.send(serverRequestMock.alta)
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'Test error'});
				done();
			});
	});

});
