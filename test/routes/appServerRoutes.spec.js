const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../server.js').bootstrapApp();
const appServerController = require('../../api/controllers/appServerController');
const serverRequestMock = require('../mocks/serverRequestMock');
const serverResponseMock = require('../mocks/serverResponseMock');

describe('App Server Routes', () => {
	let addServerStub = null;
	let getServersStub = null;
	let getServerStub = null;

	beforeEach(() => {
		addServerStub = sinon.stub(appServerController, 'addServer').callsFake(() => new Promise((resolve, reject) => {resolve(serverResponseMock.controllerResponse)}));
		getServersStub = sinon.stub(appServerController, 'getServers').callsFake(() => new Promise((resolve, reject) => {resolve(serverResponseMock.controllerResponseGetServers)}));
		getServerStub = sinon.stub(appServerController, 'getServer').callsFake(() => new Promise((resolve, reject) => {resolve(serverResponseMock.controllerResponseGetServer)}));
	});

	afterEach(() => {
		addServerStub.restore();
		getServersStub.restore();
		getServerStub.restore();
	});

	it('Get Servers', (done) => {
		request(app)
			.get('/servers')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(serverResponseMock.controllerResponseGetServers);
				done();
			});
	});

	it('Get Servers with error', (done) => {
		getServersStub.restore();
		getServersStub = sinon.stub(appServerController, 'getServers').callsFake(() => new Promise((resolve, reject) => {reject({message: 'Test error'})}));
		request(app)
			.get('/servers')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'Test error'});
				done();
			});
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

	it('Get single server', (done) => {
		request(app)
			.get('/servers/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(serverResponseMock.controllerResponseGetServer);
				done();
			})
	});

	it('Get single server Not found', (done) => {
		getServerStub.restore();
		getServerStub = sinon.stub(appServerController, 'getServer').callsFake(() => new Promise((resolve, reject) => {resolve({})}));
		request(app)
			.get('/servers/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Server not found'});
				done();
			})
	});

	it('Get single server with error', (done) => {
		getServerStub.restore();
		getServerStub = sinon.stub(appServerController, 'getServer').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));
		request(app)
			.get('/servers/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			})
	});

});
