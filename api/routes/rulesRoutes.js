const express = require('express');
const jwt = require('jsonwebtoken');
const rulesController = require('../controllers/rulesController');
const rulesValidator = require('../validators/rulesValidator');
const errorModel = require('../models/error');

const router = express.Router();

router.get('/', (req, res, then) => {
	rulesController.getRules()
		.then(data => res.status(200).json(data))
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

router.post('/', (req, res, then) => {
	var rule = req.body;
	if (!rulesValidator.isValidRule(rule))
		return then({name: 'ParametersError'});
	rulesController.addRule(rule)
		.then(data => res.status(201).json(data))
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

router.get('/:idRule', (req, res, then) => {
	const idRule = req.params.idRule;
	rulesController.getRule(idRule)
		.then(data => {
			if (!data)
				return res.status(404).json(errorModel.newError(1, "Rule not found"));
			res.status(200).json(data)
		})
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

router.put('/:idRule', (req, res, then) => {
	const idRule = req.params.idRule;
	const rule = req.body;
	if (!rulesValidator.isValidRule(rule))
		return then({name: 'ParametersError'});
	rulesController.editRule(idRule, rule)
		.then(data => {
			if (!data)
				return res.status(404).json(errorModel.newError(1, "Rule not found"));
			res.status(200).json(data)
		})
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

router.delete('/:idRule', (req, res, then) => {
	const idRule = req.params.idRule;
	rulesController.deleteRule(idRule)
		.then(data => {
			if (!data)
				return res.status(404).json(errorModel.newError(1, "Rule not found"));
			res.status(204).json();
		})
		.catch(error => {console.log(error); then({name: 'UnexpectedError'});});
});

module.exports = router;
