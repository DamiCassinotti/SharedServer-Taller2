const expect = require('chai').expect;
const trackingService = require('../../api/services/trackingService');
const trackingController = require('../../api/controllers/trackingController');
const sinon = require('sinon');
const trackingMock = require('../mocks/trackingMock');

describe('Tracking Controller', () => {
	let addTrackingStub = null;
	let getTrackingsStub = null;
	let getTrackingStub = null;
	let updateTrackingStub = null;

	beforeEach(() => {
		addTrackingStub = sinon.stub(trackingService, 'add_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(trackingMock)}));
		getTrackingsStub = sinon.stub(trackingService, 'get_trackings').callsFake(() => new Promise((resolve, reject) => {resolve([trackingMock])}));
		getTrackingStub = sinon.stub(trackingService, 'get_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(trackingMock)}));
		updateTrackingStub = sinon.stub(trackingService, 'update_tracking').callsFake(() => new Promise((resolve, reject) => {resolve(trackingMock)}));
	});

	afterEach(() => {
		addTrackingStub.restore();
		getTrackingsStub.restore();
		getTrackingStub.restore();
		updateTrackingStub.restore();
	});

	it('Add new tracking', (done) => {
		trackingController.add_tracking()
			.then(tracking => {
				expect(tracking).to.deep.equal(trackingMock);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Add new tracking with error', (done) => {
		addTrackingStub.restore();
		addTrackingStub = sinon.stub(trackingService, 'add_tracking').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		trackingController.add_tracking()
			.then(tracking => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.deep.equal('test error');
				done();
			});
	});

	it('Get all trackings', (done) => {
		trackingController.get_trackings()
			.then(tracking => {
				expect(tracking).to.deep.equal([trackingMock]);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Get all trackings with error', (done) => {
		getTrackingsStub.restore();
		getTrackingsStub = sinon.stub(trackingService, 'get_trackings').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		trackingController.get_trackings()
			.then(tracking => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.deep.equal('test error');
				done();
			});
	});

	it('Get single tracking', (done) => {
		trackingController.get_tracking(1)
			.then(tracking => {
				expect(tracking).to.deep.equal(trackingMock);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Get single tracking with error', (done) => {
		getTrackingStub.restore();
		getTrackingStub = sinon.stub(trackingService, 'get_tracking').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		trackingController.get_tracking(1)
			.then(tracking => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.deep.equal('test error');
				done();
			});
	});

	it('Update single tracking', (done) => {
		trackingController.update_tracking(1)
			.then(tracking => {
				expect(tracking).to.deep.equal(trackingMock);
				done();
			})
			.catch(err => {
				expect(true).to.equal(false);
				done();
			});
	});

	it('Update single tracking with error', (done) => {
		updateTrackingStub.restore();
		updateTrackingStub = sinon.stub(trackingService, 'update_tracking').callsFake(() => new Promise((resolve, reject) => {reject('test error')}));
		trackingController.update_tracking(1)
			.then(tracking => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.deep.equal('test error');
				done();
			});
	});

});
