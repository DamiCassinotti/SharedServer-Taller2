const expect = require('chai').expect;
const loginMocks = require('../mocks/loginMocks');
const loginValidator = require('../../api/validators/loginValidator');

describe('Login Validator', () => {

	it('Success Validation', () => {
		expect(loginValidator.isValidLogin(loginMocks.correctLogin)).to.be.true;
	});

	it('Validation Without params', () => {
		expect(loginValidator.isValidLogin({})).to.be.false;
	});

	it('Validation Without username', () => {
		expect(loginValidator.isValidLogin({password: "pass"})).to.be.false;
	});

	it('Validation Without password', () => {
		expect(loginValidator.isValidLogin({username: "user"})).to.be.false;
	});

});
