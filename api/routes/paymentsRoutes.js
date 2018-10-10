const express = require('express');
const paymentsController = require('../controllers/paymentsController');
const errorModel = require('../models/error');

const router = express.Router();

router.get('/methods', (req, res, then) => {
	paymentsController.getPaymentsMethods()
		.then(methods => res.status(200).json(methods))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

module.exports = router;
