const express = require('express');
const loginController = require('../controllers/loginController');
const loginValidator = require('../validators/loginValidator');
const errorModel = require('../models/error');

const router = express.Router();

router.post('/token', (req, res, then) => {
	console.log(req.body);
	if (!loginValidator.isValidLogin(req.body))
		return then({name: 'ParametersError'});
	console.log("Valid params");
	loginController.login(req.body.username, req.body.password)
		.then(data => {
			console.log("Resolved promise");
			if (!data)
				return res.status(401).json(errorModel.newError(3, 'Credenciales invalidas'));
			console.log("Valid login");
			res.status(201).json(data);
		})
		.catch(error => then({name: 'UnexpectedError'}));
});

module.exports = router;
