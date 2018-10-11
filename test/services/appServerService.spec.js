const expect = require('chai').expect;
const appServerService = require('../../api/services/appServerService');
const serverResponseMock = require('../mocks/serverResponseMock');
const serverRequestMock = require('../mocks/serverRequestMock');
const app = require('../../server.js').bootstrapApp();
const pg = require('pg');

describe('App Server Service', () => {

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

	it('Add new Server', async () => {
		var server = await appServerService.addServer(serverRequestMock.alta);

		expect(server).not.to.be.undefined;
		expect(server._rev).to.equal('0');
		expect(server.createdby).to.equal(serverRequestMock.alta.createdBy);
		expect(server.name).to.equal(serverRequestMock.alta.name);
		expect(server.createdtime).to.be.a('date');
	});

	it('Add new Server without parameters throws error', (done) => {
		appServerService.addServer()
			.then(tracking => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.not.be.undefined;
				done();
			});
	});

});
