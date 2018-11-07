const express = require('express');
const appServerController = require('../controllers/appServerController');
const errorModel = require('../models/error');
const appServerValidator = require('../validators/appServerValidator');

const router = express.Router();

router.get('/', (req, res, then) => {
	appServerController.getServers()
		.then(servers => res.status(200).json(servers))
		.catch(error => then({name: 'UnexpectedError'}));
});

router.post('/', (req, res, then) => {
	var server = req.body;
	if (!appServerValidator.isValidServerForAdding(server))
		return then({name: 'ParametersError'});
	appServerController.addServer(server)
		.then(server => res.status(201).json(server))
		.catch(error => then({name: 'UnexpectedError'}));
});

router.get('/:idServer', (req, res, then) => {
	var idServer = req.params.idServer;
	appServerController.getServer(idServer)
		.then(server => {
			if (!server.server)
				return res.status(404).json(errorModel.newError(1, "Server not found"));
			res.status(200).json(server)
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

router.put('/:idServer', (req, res, then) => {
	var idServer = req.params.idServer;
	var newServer = req.body;
	if (!appServerValidator.isValidServerForUpdating(newServer))
		return then({name: 'ParametersError'});
	appServerController.updateServer(idServer, newServer)
		.then(server => {
			if (!server.server)
				return res.status(404).json(errorModel.newError(1, "Server not found"));
			res.status(200).json(server)
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

router.delete('/:idServer', (req, res, then) => {
	var idServer = req.params.idServer;
	appServerController.deleteServer(idServer)
		.then(server => {
			if (!server)
				return res.status(404).json(errorModel.newError(1, "Server not found"));
			res.status(204).send();
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

router.post('/:idServer', (req, res, then) => {
	var idServer = req.params.idServer;
	appServerController.resetToken(idServer)
		.then(server => {
			if (!server.server.server)
				return res.status(404).json(errorModel.newError(1, "Server not found"));
			res.status(201).json(server)
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

module.exports = router;
