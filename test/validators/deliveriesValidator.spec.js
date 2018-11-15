const expect = require('chai').expect;
const deliveriesMocks = require('../mocks/deliveriesMocks');
const deliveriesValidator = require('../../api/validators/deliveriesValidator');

describe('Deliveries Validator', () => {

	let deliveryMock = null;

	beforeEach(() => {
		deliveryMock = JSON.parse(JSON.stringify(deliveriesMocks.request));
	});

	it('Success Validation', () => {
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.true;
	});

	it('Error Validation no Delivery', () => {
		expect(deliveriesValidator.isValidDelivery()).to.be.false;
	});

	it('Error Validation empty Delivery', () => {
		expect(deliveriesValidator.isValidDelivery({})).to.be.false;
	});

	it('Error Validation no ammount', () => {
		deliveryMock.ammount = undefined;
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no numeric ammount', () => {
		deliveryMock.ammount = "undefined";
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no distance', () => {
		deliveryMock.distance = undefined;
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no numeric distance', () => {
		deliveryMock.distance = "undefined";
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no user', () => {
		deliveryMock.user = undefined;
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no deliveries', () => {
		deliveryMock.user.deliveries = undefined;
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no email', () => {
		deliveryMock.user.email = undefined;
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no points', () => {
		deliveryMock.user.points = undefined;
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

	it('Error Validation no numeric points', () => {
		deliveryMock.user.points = "undefined";
		expect(deliveriesValidator.isValidDelivery(deliveryMock)).to.be.false;
	});

});
