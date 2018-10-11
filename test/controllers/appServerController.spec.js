const expect = require('chai').expect;
const sinon = require('sinon');
const appServerService = require('../../api/services/appServerService');
const appServerController = require('../../api/controllers/appServerController');
const serverResponseMock = require('../mocks/serverResponseMock');
const serverRequestMock = require('../mocks/serverRequestMock');

describe('Payment  Controller', () => {
	let addServerStub = null;

	beforeEach(() => {
		addServerStub = sinon.stub(appServerService, 'addServer').callsFake(() => new Promise((resolve, reject) => {resolve(serverResponseMock.serviceResponse)}));
	});

	afterEach(() => {
		addServerStub.restore();
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

});
