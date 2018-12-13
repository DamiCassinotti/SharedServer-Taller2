const config = require('../../config.json');
const rulesService = require('../services/rulesService.js');

exports.getRules = () => {
	return new Promise((resolve, reject) => {
		rulesService.getRules()
			.then(rules => resolve(rules))
			.catch(err => reject(err));
	})
};

exports.addRule = (rule) => {
	return new Promise((resolve, reject) => {
		rulesService.addRule(rule)
			.then(rule => resolve(rule))
			.catch(err => reject(err));
	})
}

exports.getRule = (idRule) => {
	return new Promise((resolve, reject) => {
		rulesService.getRule(idRule)
			.then(rules => resolve(rules))
			.catch(err => reject(err));
	})
};

exports.editRule = (idRule, rule) => {
	return new Promise((resolve, reject) => {
		rulesService.editRule(idRule, rule)
			.then(edited => resolve(edited))
			.catch(err => reject(err));
	})
};

exports.deleteRule = (idRule) => {
	return new Promise((resolve, reject) => {
		rulesService.deleteRule(idRule)
			.then(deleted => resolve(deleted))
			.catch(err => reject(err));
	})
};
