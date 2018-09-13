var should = require('chai').should(),
	requestUtils = require('../api/utils/requestUtils');

describe('RequestUtils', function() {
	describe('#makeSimpleRequest()', function() {
		it('should get ping from app-server', function() {
			var callback = function(response) {
				response.should.have.property('state').equal('OK');
			}
			requestUtils.makeSimpleRequest('http://app-server-taller2.herokuapp.com/ping', callback);
		});

		it('should get error from random url', function() {
			var callback = function(response) {
				response.should.have.property('state').equal('ERROR');
			}
			requestUtils.makeSimpleRequest('http://www.example.org/asdasd', callback);
		});
	});
});
