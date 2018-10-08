const expect = require('chai').expect;
const trackingController = require('../../api/controllers/trackingController');
const request = require('supertest');
const sinon = require('sinon');
const trackingMock = require('../mocks/trackingMock');
const app = require('../../server.js').bootstrapApp();

describe('Tracking Routes', () => {
	let addTrackingStub = null;
	let getTrackingsStub = null;
	let getTrackingStub = null;
	let updateTrackingStub = null;

	beforeEach(() => {
		addTrackingStub = sinon.stub(trackingController, 'add_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(trackingMock)}));
		getTrackingsStub = sinon.stub(trackingController, 'get_trackings').callsFake(() => new Promise((resolve, reject) => {resolve([trackingMock])}));
		getTrackingStub = sinon.stub(trackingController, 'get_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(trackingMock)}));
		updateTrackingStub = sinon.stub(trackingController, 'update_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(trackingMock)}));
	});

	afterEach(() => {
		addTrackingStub.restore();
		getTrackingsStub.restore();
		getTrackingStub.restore();
		updateTrackingStub.restore();
	});

	it('Add new tracking', (done) => {
		request(app)
			.post('/tracking')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(trackingMock);
				done();
			});
	});

	it('Add new tracking with error', (done) => {
		addTrackingStub.restore();
		addTrackingStub = sinon.stub(trackingController, 'add_tracking').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));
		request(app)
			.post('/tracking')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			});
	});

	it('Get all trackings', (done) => {
		request(app)
			.get('/tracking')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal([trackingMock]);
				done();
			})
	});

	it('Get all trackings with error', (done) => {
		getTrackingsStub.restore();
		getTrackingsStub = sinon.stub(trackingController, 'get_trackings').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));
		request(app)
			.get('/tracking')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			})
	});

	it('Get single tracking', (done) => {
		request(app)
			.get('/tracking/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(trackingMock);
				done();
			})
	});

	it('Get single tracking Not found', (done) => {
		getTrackingStub.restore();
		getTrackingStub = sinon.stub(trackingController, 'get_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(null)}));
		request(app)
			.get('/tracking/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'TrackingNotFound'});
				done();
			})
	});

	it('Get single tracking with error', (done) => {
		getTrackingStub.restore();
		getTrackingStub = sinon.stub(trackingController, 'get_tracking').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));
		request(app)
			.get('/tracking/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			})
	});

	it('Update tracking', (done) => {
		request(app)
			.put('/tracking/1')
			.set('Accept', 'applicacion/json')
			.send({status: 'EN_TRANSITO'})
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal(trackingMock);
				done();
			})
	});

	it('Update tracking without status', (done) => {
		request(app)
			.put('/tracking/1')
			.set('Accept', 'applicacion/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 1, message: 'Parametros faltantes'});
				done();
			})
	});

	it('Update tracking Not found', (done) => {
		updateTrackingStub.restore();
		updateTrackingStub = sinon.stub(trackingController, 'update_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(null)}));
		request(app)
			.put('/tracking/1')
			.set('Accept', 'applicacion/json')
			.send({status: 'EN_TRANSITO'})
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 2, message: 'TrackingNotFound'});
				done();
			})
	});

	it('Update tracking with error', (done) => {
		updateTrackingStub.restore();
		updateTrackingStub = sinon.stub(trackingController, 'update_tracking').callsFake(() => new Promise((resolve, reject) => {reject({message: 'test error'})}));
		request(app)
			.put('/tracking/1')
			.set('Accept', 'applicacion/json')
			.send({status: 'EN_TRANSITO'})
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				expect(err).to.equal(null);
				expect(res.body).to.deep.equal({code: 0, message: 'test error'});
				done();
			})
	});
});
