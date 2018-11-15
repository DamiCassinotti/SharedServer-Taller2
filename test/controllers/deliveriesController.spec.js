const expect = require('chai').expect;
const sinon = require('sinon');
const deliveriesController = require('../../api/controllers/deliveriesController');
const deliveriesMocks = require('../mocks/deliveriesMocks');

describe('Login Controller', () => {

	let deliveryRequestMock = null;
	let deliveryResponseMock = null;

	beforeEach(() => {
		deliveryRequestMock = JSON.parse(JSON.stringify(deliveriesMocks.request));
		deliveryResponseMock = JSON.parse(JSON.stringify(deliveriesMocks.response));
	});

	it('10KM delivery costs 150 and is able to do it', (done) => {
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				expect(false).to.be.true;
				done();
			})
	});

	it('When ammount is less than 50ARS is not able to deliver', (done) => {
		deliveryRequestMock.ammount = 49;
		deliveryResponseMock.ammount = deliveryRequestMock.ammount;
		deliveryResponseMock.isAbleToDeliver = false;
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				expect(false).to.be.true;
				done();
			})
	});

	it('When ammount is greater or equal than 50ARS is able to deliver', (done) => {
		deliveryRequestMock.ammount = 50;
		deliveryResponseMock.ammount = deliveryRequestMock.ammount;
		deliveryResponseMock.isAbleToDeliver = true;
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				expect(false).to.be.true;
				done();
			})
	});

	it('When user\'s deliveries are zero costs is 100ARS off', (done) => {
		deliveryRequestMock.user.deliveries = 0;
		deliveryResponseMock.user.deliveries = deliveryRequestMock.user.deliveries;
		deliveryResponseMock.cost = 50;
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				console.log(error);
				expect(false).to.be.true;
				done();
			})
	});

	it('When user\'s email ends with @comprame.com.ar cost is zero', (done) => {
		deliveryRequestMock.user.email = "damiancassinotti@comprame.com.ar";
		deliveryResponseMock.user.email = deliveryRequestMock.user.email;
		deliveryResponseMock.cost = 0;
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				console.log(error);
				expect(false).to.be.true;
				done();
			})
	});

	it('When user\'s points are negative is not able to deliver', (done) => {
		deliveryRequestMock.user.points = -1;
		deliveryResponseMock.user.points = deliveryRequestMock.user.points;
		deliveryResponseMock.isAbleToDeliver = false;
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				console.log(error);
				expect(false).to.be.true;
				done();
			})
	});

	it('When user\'s points are zero is able to deliver', (done) => {
		deliveryRequestMock.user.points = 0;
		deliveryResponseMock.user.points = deliveryRequestMock.user.points;
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				console.log(error);
				expect(false).to.be.true;
				done();
			})
	});

	it('After 10th delivery 5%off', (done) => {
		deliveryRequestMock.user.deliveries = 10;
		deliveryResponseMock.user.deliveries = deliveryRequestMock.user.deliveries;
		deliveryResponseMock.cost = 142.5
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				console.log(error);
				expect(false).to.be.true;
				done();
			})
	});

	it('Costs cant be below 0', (done) => {
		deliveryRequestMock.distance = 5; // Cost = 75
		deliveryResponseMock.distance = deliveryRequestMock.distance;
		deliveryRequestMock.user.deliveries = 0; // 100ARS off
		deliveryResponseMock.user.deliveries = deliveryRequestMock.user.deliveries;
		deliveryResponseMock.cost = 0
		deliveriesController.estimate(deliveryRequestMock)
			.then(delivery => {
				expect(delivery).to.deep.equal(deliveryResponseMock);
				done();
			})
			.catch(error => {
				console.log(error);
				expect(false).to.be.true;
				done();
			})
	});

});
