const nools = require("nools");
const rulesService = require('../services/rulesService')

var Delivery = function(delivery) {
	this.ammount = delivery.ammount || 0;
	this.distance = delivery.distance || 0;
	this.deliveries = delivery.user ? delivery.user.deliveries : 0;
	this.email = delivery.user ? delivery.user.email : '';
	this.points = delivery.user ? delivery.user.points : 0;
}

var Result = function(cost, isAbleToDeliver) {
	this.cost = cost || 0;
	this.isAbleToDeliver = isAbleToDeliver || true;
}

var multiply = (facts, property, value) => {
	facts.result.cost = facts.delivery[property] * value;
}

var setQualification = (facts, value) => {
	facts.result.isAbleToDeliver = value ? true : false;
}

var addCost = (facts, value) => {
	facts.result.cost += value;
}

var factor = (facts, value) => {
	facts.result.cost *= value;
}

var addRule = (flow, rule) => {
	flow.rule(rule.description, [[Delivery, "delivery", rule.condition], [Result, "result"]], (facts) => {
		switch(rule.type) {
		case 'multiply':
			multiply(facts, rule.property, rule.value);
			break;
		case 'qualification':
			setQualification(facts, rule.value);
			break;
		case 'add':
			addCost(facts, rule.value);
			break;
		case 'factor':
			factor(facts, rule.value);
			break;
		}
	});
}

exports.estimate = async (delivery) => {
	var rules = await rulesService.getRules();

	var flow = nools.flow("deliveryCostEstimation");

	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		addRule(flow, rule);
	}

	var result = new Result();
	var session = flow.getSession(new Delivery(delivery), result);

	return new Promise(async(resolve, reject) => {
		session.match()
			.then(() => {
				session.dispose();
				if (result.cost < 0)
					result.cost = 0;
				delivery.isAbleToDeliver = result.isAbleToDeliver;
				delivery.cost = parseInt(result.cost * 100) / 100;
				nools.deleteFlows();
				resolve(delivery)
			});
	});
}
