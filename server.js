var express = require('express'),
	loginRoutes = require('./api/routes/loginRoutes'),
	trackingRoutes = require('./api/routes/trackingRoutes'),
	paymentsRoutes = require('./api/routes/paymentsRoutes'),
	appServerRoutes = require('./api/routes/appServerRoutes'),
	deliveriesRoutes = require('./api/routes/deliveriesRoutes'),
	reportsRoutes = require('./api/routes/reportsRoutes'),
	rulesRoutes = require('./api/routes/rulesRoutes'),
	requestsController = require('./api/controllers/requestsController'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 5004,
	jwt = require('express-jwt'),
	errorModel = require('./api/models/error'),
	config = require('./config.json');

var pg = require('pg'),
	connectionString = process.env.DATABASE_URL || config.database.default;
client = new pg.Client(connectionString);

bootstrapApp = () => {
	var app = express();

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		if (req.method == 'OPTIONS')
	  		res.send(200)
		else
			next();
	});

	app.use(jwt({secret: config.tokens.secret}).unless({
		path: ['/user/token', { url: '/servers', methods: ['POST'] }]
	}));

	app.use((req, res, next) => {
		var startTime = Date.now();
		res.on('finish', () => {
			if (!res.req.route)
				return;
			requestsController.reportRequest(res.req.baseUrl + res.req.route.path, req.method, res.statusCode, Date.now() - startTime);
		});
		next();
	});

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	app.use('/user', loginRoutes);
	app.use('/tracking', trackingRoutes);
	app.use('/payments', paymentsRoutes);
	app.use('/servers', appServerRoutes);
	app.use('/deliveries', deliveriesRoutes);
	app.use('/report', reportsRoutes);
	app.use('/rules', rulesRoutes);

	app.use((err, req, res, next) => {
		switch (err.name) {
			case 'UnauthorizedError': {
				res.status(401).send(errorModel.newError(0, 'Unauthorized Access'));
        		break;
			}
			case 'UnexpectedError': {
				res.status(500).send(errorModel.newError(1, 'Unexpected Error'));
        		break;
			}
			case 'ParametersError': {
				res.status(400).send(errorModel.newError(2, 'Parametros erroneos'));
        		break;
			}
			case 'BadRev': {
				res.status(409).send(errorModel.newError(3, 'Update conflict'));
        		break;
			}
		}
	});

	return app;
};

const server = {
	start: (onStart) => {
		var app = bootstrapApp();
		client.connect();
		app.listen(port, () => onStart(port));
	},
	bootstrapApp
}

module.exports = server;
