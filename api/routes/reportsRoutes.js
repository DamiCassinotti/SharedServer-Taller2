const express = require('express');
const requestsController = require('../controllers/requestsController');
const appServerController = require('../controllers/appServerController');
const errorModel = require('../models/error');

const router = express.Router();

router.get('/requests', (req, res, then) => {
	requestsController.getReport()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

router.get('/status', (req, res, then) => {
	appServerController.getServersStatus()
		.then(data => res.status(200).json(data))
		.catch(error => then({name: 'UnexpectedError'}));
})

module.exports = router;
