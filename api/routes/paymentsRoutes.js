const express = require('express');
const paymentsController = require('../controllers/paymentsController');
const errorModel = require('../models/error');
const paymentValidator = require('../validators/paymentValidator');

const router = express.Router();

router.post('/', (req, res, then) => {
	var payment = req.body;
	if (!paymentValidator.isValidPayment(payment))
		return res.status(400).json(errorModel.newError(1, 'Parametros erroneos'));
	paymentsController.addPayment(payment)
		.then(payment => res.status(200).json(payment))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
})

router.get('/methods', (req, res, then) => {
	paymentsController.getPaymentsMethods()
		.then(methods => res.status(200).json(methods))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

module.exports = router;
