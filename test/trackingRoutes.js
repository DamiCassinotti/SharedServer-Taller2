const should = require('chai').should();
const trackingController = require('../api/controllers/trackingController');
const request = require('supertest');
const sinon = require('sinon');
const trackingMock = require('./mocks/trackingMock');
const app = require('../server.js').bootstrapApp();

describe('Tracking Routes', () => {
	let addTrackingStub = null;
	let dbStub = null;

	beforeEach(() => {
		addTrackingStub = sinon.stub(trackingController, 'addTracking').callsFake(() => trackingMock);
		dbStub = sinon.stub(client, "connect").callsFake(() => {});
	});

	afterEach(() => {
		addTrackingStub.restore();
		dbStub.restore();
	});

	it('Add new tracking', (done) => {
		request(app)
			.post('/tracking')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(201, done);
	})
});
