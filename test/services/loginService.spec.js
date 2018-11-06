const expect = require('chai').expect;
const loginService = require('../../api/services/loginService');
const loginMocks = require('../mocks/loginMocks');
const app = require('../../server.js').bootstrapApp();
const pg = require('pg');
const config = require('../../config.json');

describe('Login Service', () => {

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

	it('Successful login', async () => {
		var isValidLogin = await loginService.isValidLogin(loginMocks.correctLogin.username, loginMocks.correctLogin.password);

		expect(isValidLogin).to.be.true;
	});

	it('Unuccessful login', async () => {
		var isValidLogin = await loginService.isValidLogin(loginMocks.incorrectLogin.username, loginMocks.incorrectLogin.password);

		expect(isValidLogin).to.be.false;
	});

	it('Login without parameters throws error', (done) => {
		loginService.isValidLogin()
			.then(isValid => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.not.be.undefined;
				done();
			});
	});

});
