const express = require('express');
const paymentsController = require('../controllers/paymentsController');
const errorModel = require('../models/error');
const paymentValidator = require('../validators/paymentValidator');

const router = express.Router();

router.get('/', (req, res, then) => {
	paymentsController.getPayments()
		.then(payments => res.status(200).json(payments))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

router.post('/', (req, res, then) => {
	var payment = req.body;
	if (!paymentValidator.isValidPayment(payment))
		return res.status(400).json(errorModel.newError(1, 'Parametros erroneos'));
	paymentsController.addPayment(payment)
		.then(payment => res.status(201).json(payment))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

router.get('/id/:idPayment', (req, res, then) => {
	var idPayment = req.params.idPayment;
	paymentsController.getPayment(idPayment)
		.then(payment => {
			if (!payment || !payment.length)
				return res.status(404).json(errorModel.newError(1, 'Payment not found'));
			res.status(200).json(payment)
		})
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

router.put('/id/:idPayment', (req, res, then) => {
	var idPayment = req.params.idPayment;
	var status = req.body.status;
	if (!status)
		return res.status(400).json(errorModel.newError(2, 'Parametros erroneos'));
	paymentsController.updatePayment(idPayment, status)
		.then(payment => {
			if (!payment)
				return res.status(404).json(errorModel.newError(1, 'Payment not found'));
			res.status(200).json(payment)
		})
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

router.get('/methods', (req, res, then) => {
	paymentsController.getPaymentsMethods()
		.then(methods => res.status(200).json(methods))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

module.exports = router;
