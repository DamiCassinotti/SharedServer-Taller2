const express = require('express');
const paymentsController = require('../controllers/paymentsController');
const paymentValidator = require('../validators/paymentValidator');
const errorModel = require('../models/error');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res, then) => {
	paymentsController.getPayments()
		.then(payments => res.status(200).json(payments))
		.catch(error => then({name: 'UnexpectedError'}));
});

router.post('/', (req, res, then) => {
	var payment = req.body;
	if (!paymentValidator.isValidPayment(payment))
		return then({name: 'ParametersError'});
	paymentsController.addPayment(payment)
		.then(payment => res.status(201).json(payment))
		.catch(error => then({name: 'UnexpectedError'}));
});

router.get('/id/:idPayment', (req, res, then) => {
	var idPayment = req.params.idPayment;
	paymentsController.getPayment(idPayment)
		.then(payment => {
			if (!payment || !payment.length)
				return res.status(404).json(errorModel.newError(1, 'Payment not found'));
			res.status(200).json(payment)
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

router.put('/id/:idPayment', (req, res, then) => {
	var idPayment = req.params.idPayment;
	var status = req.body.status;
	if (!status)
		return then({name: 'ParametersError'});
	paymentsController.updatePayment(idPayment, status)
		.then(payment => {
			if (!payment)
				return res.status(404).json(errorModel.newError(1, 'Payment not found'));
			res.status(200).json(payment)
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

router.get('/methods', (req, res, then) => {
	paymentsController.getPaymentsMethods()
		.then(methods => res.status(200).json(methods))
		.catch(error => then({name: 'UnexpectedError'}));
});

module.exports = router;
