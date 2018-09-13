var should = require('chai').should(),
	ajaxUtils = require('../api/utils/ajaxUtils');

describe('AjaxUtils', function() {
	describe('#createSimpleResponseOk()', function() {
		it('should include OK state', function() {
			var response = ajaxUtils.createSimpleResponseOk();
			response.should.have.property('state');
			response.state.should.equal('OK');
		});

		it('should include data', function() {
			var data = {message: 'hello world'};
			var response = ajaxUtils.createSimpleResponseOk(data);
			response.should.have.property('data');
			response.data.should.equal(data);
		});
	});

	describe('#createSimpleResponseError()', function() {
		it('should include ERROR state', function() {
			var response = ajaxUtils.createSimpleResponseError();
			response.should.have.property('state');
			response.state.should.equal('ERROR');
		});

		it('should include message', function() {
			var message = 'hello world';
			var response = ajaxUtils.createSimpleResponseError(message);
			response.should.have.property('message');
			response.message.should.equal(message);
		});
	});
});
