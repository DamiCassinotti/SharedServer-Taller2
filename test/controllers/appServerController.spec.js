const expect = require('chai').expect;
const sinon = require('sinon');
const appServerService = require('../../api/services/appServerService');
const appServerController = require('../../api/controllers/appServerController');
const serverResponseMock = require('../mocks/serverResponseMock');
const serverRequestMock = require('../mocks/serverRequestMock');

describe('App Server Controller', () => {
	let addServerStub = null;
	let getServersStub = null;
	let getServerStub = null;
	let deleteServerStub = null;

	beforeEach(() => {
		addServerStub = sinon.stub(appServerService, 'addServer').callsFake(() => new Promise((resolve, reject) => {resolve(serverResponseMock.serviceResponse)}));
		getServersStub = sinon.stub(appServerService, 'getServers').callsFake(() => new Promise((resolve, reject) => {resolve([serverResponseMock.serviceResponse])}));
		deleteServerStub = sinon.stub(appServerService, 'deleteServer').callsFake(() => new Promise((resolve, reject) => {resolve(1)}));
		getServerStub = sinon.stub(appServerService, 'getServer').callsFake(() => new Promise((resolve, reject) => {resolve(serverResponseMock.serviceResponse)}));
	});

	afterEach(() => {
		addServerStub.restore();
		getServersStub.restore();
		getServerStub.restore();
		deleteServerStub.restore();
	});

	it('Get Servers', (done) => {
		appServerController.getServers()
			.then(servers => {
				expect(servers).not.to.be.undefined;
				expect(servers).to.deep.equal(serverResponseMock.controllerResponseGetServers);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Add Server', (done) => {
		appServerController.addServer(serverRequestMock.alta)
			.then(server => {
				expect(server).to.deep.equal(serverResponseMock.controllerResponse);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Add Server with error', (done) => {
		addServerStub.restore();
		addServerStub = sinon.stub(appServerService, 'addServer').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		appServerController.addServer(serverRequestMock.alta)
			.then(server => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).not.to.be.undefined;
				expect(err).to.deep.equal('test error');
				done();
			});
	});

	it('Get single server', (done) => {
		appServerController.getServer(1)
			.then(server => {
				expect(server).to.deep.equal(serverResponseMock.controllerResponseGetServer);
				done();
			})
			.catch(err => {
				console.log(err);
				expect(true).to.equal(false);
				done();
			});
	});

	it('Get single server with error', (done) => {
		getServerStub.restore();
		getServerStub = sinon.stub(appServerService, 'getServer').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		appServerController.getServer(1)
			.then(server => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.deep.equal('test error');
				done();
			});
	});

	it('Delete server', (done) => {
		appServerController.deleteServer(1)
			.then(deleted => {
				expect(deleted).to.equal(1);
				done();
			})
			.catch(err => {
				console.log(err);
				expect(true).to.equal(false);
				done();
			});
	});

	it('Delete server with error', (done) => {
		deleteServerStub.restore();
		deleteServerStub = sinon.stub(appServerService, 'deleteServer').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		appServerController.deleteServer(1)
			.then(server => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.deep.equal('test error');
				done();
			});
	});

});
