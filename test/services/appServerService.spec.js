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

	it('Select all servers', async () => {
		var servers = await appServerService.getServers();

		expect(servers).to.not.be.undefined;
		expect(servers).to.be.an('array').that.is.empty;
	});

	it('Select all server after inserting', async () => {
		var server = await appServerService.addServer(serverRequestMock.alta);

		var servers = await appServerService.getServers();

		expect(servers).to.not.be.undefined;
		expect(servers).to.be.an('array');
		expect(servers.length).to.equal(1);
		expect(servers[0]).to.deep.equal(server);
	});

	it('Add two servers, id autoincrement', async () => {
		var server = await appServerService.addServer(serverRequestMock.alta);

		var newServer = await appServerService.addServer(serverRequestMock.alta);

		expect(newServer.id).to.equal(server.id + 1);
	});

	it('Select one server after inserting', async () => {
		var server = await appServerService.addServer(serverRequestMock.alta);

		var sameServer = await appServerService.getServer(server.id);

		expect(sameServer).to.not.be.undefined;
		expect(sameServer).to.deep.equal(server);
	});

	it('Select one server without id throws error', (done) => {
		appServerService.getServer()
			.then(server => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.not.be.undefined;
				done();
			});
	});

	it('Select one server without inserting return empty json', async () => {
		var sameServer = await appServerService.getServer(serverRequestMock.alta.id);

		expect(sameServer).to.be.undefined;
	});

	it('Delete one server without inserting', async () => {
		var deleted = await appServerService.deleteServer(serverRequestMock.alta.id);

		expect(deleted).to.not.be.undefined;
		expect(deleted).to.equal(0);
	});

	it('Delete one server after inserting', async () => {
		var server = await appServerService.addServer(serverRequestMock.alta);

		var deleted = await appServerService.deleteServer(server.id);

		expect(deleted).to.not.be.undefined;
		expect(deleted).to.equal(1);
	});

	it('Delete one server without id throws error', (done) => {
		appServerService.deleteServer()
			.then(server => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.not.be.undefined;
				done();
			});
	});

});
