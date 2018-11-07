const expect = require('chai').expect;
const sinon = require('sinon');
const loginController = require('../../api/controllers/loginController');
const loginService = require('../../api/services/loginService');
const loginMocks = require('../mocks/loginMocks');

describe('Login Controller', () => {

	let loginStub = null;

	beforeEach(() => {
		loginStub = sinon.stub(loginService, 'isValidLogin').callsFake(() => new Promise((resolve, reject) => {resolve(true)}));
	});

	afterEach(() => {
		loginStub.restore();
	});

	it('Successful login', (done) => {
		loginController.login(loginMocks.correctLogin.username, loginMocks.correctLogin.password)
			.then(response => {
				expect(response).not.to.be.undefined;
				expect(response.metadata).to.deep.equal(loginMocks.controllerResponse.metadata);
				expect(response.token).not.to.be.undefined;
				expect(response.token.token).to.be.a('string');
				expect(response.token.expiresAt).to.be.a('date');
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Unsuccessful login', (done) => {
		loginStub.restore();
		loginStub = sinon.stub(loginService, 'isValidLogin').callsFake(() => new Promise((resolve, reject) => {resolve(false)}));
		loginController.login(loginMocks.incorrectLogin.username, loginMocks.incorrectLogin.password)
			.then(response => {
				expect(response).to.be.null;
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('login with error', (done) => {
		loginStub.restore();
		loginStub = sinon.stub(loginService, 'isValidLogin').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		loginController.login(loginMocks.incorrectLogin.username, loginMocks.incorrectLogin.password)
			.then(response => {
				expect(true).to.be.false;
				done();
			})
			.catch(err => {
				expect(err).not.to.be.undefined;
				expect(err).to.equal('test error');
				done();
			});
	});

});
