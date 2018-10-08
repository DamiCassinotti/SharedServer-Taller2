const expect = require('chai').expect;
const trackingService = require('../../api/services/trackingService');
const app = require('../../server.js').bootstrapApp();
const pg = require('pg');

describe('Tracking Service', () => {

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

	it('Add new tracking', async () => {
		var tracking = await trackingService.add_tracking();

		expect(tracking).to.not.be.undefined;
		expect(tracking.status).to.equal('PENDIENTE');
		expect(tracking.updateat).to.be.a('date');
	});

	it('Select all trackings', async () => {
		var trackings = await trackingService.get_trackings();

		expect(trackings).to.not.be.undefined;
		expect(trackings).to.be.an('array').that.is.empty;
	});

	it('Select all trackings after inserting', async () => {
		var tracking = await trackingService.add_tracking();

		var trackings = await trackingService.get_trackings();

		expect(trackings).to.not.be.undefined;
		expect(trackings).to.be.an('array');
		expect(trackings.length).to.equal(1);
		expect(trackings[0]).to.deep.equal(tracking);
	});

	it('Add two trackings, id autoincrement', async () => {
		var tracking = await trackingService.add_tracking();

		var newTracking = await trackingService.add_tracking();

		expect(newTracking.id).to.equal(tracking.id + 1);
	});

	it('Select one tracking after inserting', async () => {
		var tracking = await trackingService.add_tracking();

		var sameTracking = await trackingService.get_tracking(tracking.id);

		expect(sameTracking).to.not.be.undefined;
		expect(sameTracking).to.be.an('array');
		expect(sameTracking.length).to.equal(1);
		expect(sameTracking[0]).to.deep.equal(tracking);
	});

	it('Select one tracking without id throws error', (done) => {
		trackingService.get_tracking()
			.then(tracking => {
				expect(true).to.equa(false);
				done();
			})
			.catch(err => {
				expect(err).to.not.be.undefined;
				done();
			});
	});

	it('Update one tracking after inserting', async () => {
		var tracking = await trackingService.add_tracking();

		setTimeout(async function() {
			var updatedTracking = await trackingService.update_tracking(tracking.id, 'EN_TRANSITO');

			expect(updatedTracking).to.not.be.undefined;
			expect(updatedTracking.id).to.equal(tracking.id);
			expect(updatedTracking.status).to.equal('EN_TRANSITO');
			expect(updatedTracking.updateat).to.be.above(tracking.updateat);
		}, 1000);
	});

	it('Update one tracking without parameters throws error', (done) => {
		trackingService.update_tracking()
			.then(tracking => {
				expect(true).to.equal(false);
				done();
			})
			.catch(err => {
				expect(err).to.not.be.undefined;
				done();
			});
	});

	it('Select all trackings after updating', async () => {
		var tracking = await trackingService.add_tracking();
		var updatedTracking = await trackingService.update_tracking(tracking.id);

		var sameTracking = await trackingService.get_tracking(tracking.id);

		expect(sameTracking).to.not.be.undefined;
		expect(sameTracking).to.be.an('array');
		expect(sameTracking.length).to.equal(2);
		expect(sameTracking).to.deep.equal([tracking, updatedTracking]);
	});

});
