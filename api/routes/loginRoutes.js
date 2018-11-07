const express = require('express');
const loginController = require('../controllers/loginController');
const loginValidator = require('../validators/loginValidator');
const errorModel = require('../models/error');

const router = express.Router();

router.post('/token', (req, res, then) => {
	if (!loginValidator.isValidLogin(req.body))
		return then({name: 'ParametersError'});
	loginController.login(req.body.username, req.body.password)
		.then(data => {
			if (!data)
				return res.status(401).json(errorModel.newError(3, 'Invalid credentials'));
			res.status(201).json(data);
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

module.exports = router;
