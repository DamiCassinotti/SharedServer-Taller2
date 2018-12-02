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
		payment.paymentMethod.payment_method = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.false;
	});

	it('Error Validation without exp_date', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.expiration_date = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.true;
		expect(paymentValidator.isValidPaymentMethodTarjeta(payment)).to.be.false;
	});

	it('Error Validation without number', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.number = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.true;
		expect(paymentValidator.isValidPaymentMethodTarjeta(payment)).to.be.false;
	});

	it('Error Validation without cardholder_name', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.cardholder_name = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.true;
		expect(paymentValidator.isValidPaymentMethodTarjeta(payment)).to.be.false;
	});

	it('Error Validation without secutiry_code', () => {
		var payment = paymentMockCredito;
		payment.paymentMethod.security_code = undefined;
		expect(paymentValidator.isValidPayment(payment)).to.be.true;
		expect(paymentValidator.isValidPaymentMethodTarjeta(payment)).to.be.false;
	});

});
