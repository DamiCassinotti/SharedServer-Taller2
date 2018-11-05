const expect = require('chai').expect;
const sinon = require('sinon');
const loginController = require('../../api/controllers/loginController');
const loginMocks = require('../mocks/loginMocks');

describe('Login Controller', () => {

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

});
