const express = require('express');
const deliveriesController = require('../controllers/deliveriesController');
const errorModel = require('../models/error');
// const deliveriesValidator = require('../validators/deliveriesValidator');

const router = express.Router();

router.post('/estimate', (req, res, then) => {
	var delivery = req.body;
	// if (!deliveriesValidator.isValidDelivery(server))
	// 	return then({name: 'ParametersError'});
	deliveriesController.estimate(delivery)
		.then(delivery => res.status(201).json(delivery))
		.catch(error => {console.log(error); then({name: 'UnexpectedError'})});
});

module.exports = router;
