const expect = require('chai').expect;
const paymentMocks = require('../mocks/paymentMocks');
const paymentValidator = require('../../api/validators/paymentValidator');

describe('Payment Validator', () => {

	let paymentMockCredito = null;
	let paymentMockDebito = null;
	let paymentMockEfectivo = null;

	beforeEach(() => {
		paymentMockCredito = JSON.parse(JSON.stringify(paymentMocks.credito));
		paymentMockDebito = JSON.parse(JSON.stringify(paymentMocks.debito));
		paymentMockEfectivo = JSON.parse(JSON.stringify(paymentMocks.efectivo));
	});

	it('Success Validation Efectivo', () => {
		var payment = paymentMockEfectivo;
		expect(paymentValidator.isValidPayment(payment)).to.be.true;
	});

	it('Success Validation Credito', () => {
		var payment = paymentMockCredito;
		expect(paymentValidator.isValidPayment(payment)).to.be.true;
	});

	it('Success Validation Debito', () => {
		var payment = paymentMockDebito;
		expect(paymentValidator.isValidPayment(payment)).to.be.true;
	});

	it('Error Validation without transaction_id', () => {
		var payment = paymentMockCredito;
		payment.transaction_id = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without currency', () => {
		var payment = paymentMockCredito;
		payment.currency = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without value', () => {
		var payment = paymentMockCredito;
		payment.value = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation with NaN value', () => {
		var payment = paymentMockCredito;
		payment.value = "asd";
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without paymentMethod', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without paymentMethod method', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.method = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation with random paymentMethod method', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.method = 'undefined';
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without exp_month and CREDITO', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.expiration_month = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without exp_month and DEBITO', () => {
		var payment = paymentMockDebito;
		payment.paymentMethod.expiration_month = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without exp_year and CREDITO', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.expiration_year = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without exp_year and DEBITO', () => {
		var payment = paymentMockDebito;
		payment.paymentMethod.expiration_year = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without number and CREDITO', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.number = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without number and DEBITO', () => {
		var payment = paymentMockDebito;
		payment.paymentMethod.number = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

});
