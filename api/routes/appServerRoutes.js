const express = require('express');
const appServerController = require('../controllers/appServerController');
const errorModel = require('../models/error');
const appServerValidator = require('../validators/appServerValidator');

const router = express.Router();

router.get('/', (req, res, then) => {
	appServerController.getServers()
		.then(servers => res.status(201).json(servers))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

router.post('/', (req, res, then) => {
	var server = req.body;
	if (!appServerValidator.isValidServerForAdding(server))
		return res.status(400).json(errorModel.newError(1, 'Parametros erroneos'));
	appServerController.addServer(server)
		.then(server => res.status(201).json(server))
		.catch(error => res.status(500).json(errorModel.newError(0, error.message)));
});

module.exports = router;
