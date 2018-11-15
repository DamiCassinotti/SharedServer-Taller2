const nools = require("nools");

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

const flow = nools.flow("Delivery cost estimation", (flow) => {
	flow.rule("Costo por KM", [[Delivery, "delivery", "delivery.distance > 0"], [Result, "result", "result.isAbleToDeliver"]], (facts) => {
		facts.result.cost = facts.delivery.distance * 15;
	});

	flow.rule("Esta habilitado segun compra minima de 50ARS", [[Delivery, "delivery", "delivery.ammount < 50"], [Result, "result"]], (facts) => {
		facts.result.isAbleToDeliver = false;
	});

	flow.rule("Descuento de 100ARS en primer viaje", [[Delivery, "delivery", "delivery.deliveries == 0"], [Result, "result"]], (facts) => {
		facts.result.cost -= 100;
	});

	flow.rule("Envio gratis si email tiene dominio @comprame.com.ar", [[Delivery, "delivery", "delivery.email =~ /.*@comprame.com.ar$/"], [Result, "result"]], (facts) => {
		facts.result.cost = 0;
	});

	flow.rule("No puede solicitar envio si tiene puntaje negativo", [[Delivery, "delivery", "delivery.points < 0"], [Result, "result"]], (facts) => {
		facts.result.isAbleToDeliver = false;
	});

	flow.rule("Descuento de 5% a partir del 10mo viaje", [[Delivery, "delivery", "delivery.deliveries > 10"], [Result, "result"]], (facts) => {
		facts.result.cost *= 0.95;
	});
});

exports.estimate = (delivery) => {
	return new Promise((resolve, reject) => {
		var result = new Result();
		var session = flow.getSession(new Delivery(delivery), result);
		session.match()
			.then(() => {
				session.dispose();
				if (result.cost < 0)
					result.cost = 0;
				delivery.isAbleToDeliver = result.isAbleToDeliver;
				delivery.cost = result.cost;
				resolve(delivery)
			});
	});
}
