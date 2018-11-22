const express = require('express');
const requestsController = require('../controllers/requestsController');
const errorModel = require('../models/error');

const router = express.Router();

router.get('/requests', (req, res, then) => {
	requestsController.getReport()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

module.exports = router;
