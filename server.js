var express = require('express'),
	loginRoutes = require('./api/routes/loginRoutes'),
	trackingRoutes = require('./api/routes/trackingRoutes'),
	paymentsRoutes = require('./api/routes/paymentsRoutes'),
	appServerRoutes = require('./api/routes/appServerRoutes'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 5001,
	yaml = require('js-yaml'),
	fs = require('fs'),
	jwt = require('express-jwt'),
	errorModel = require('./api/models/error');

config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var pg = require('pg'),
	connectionString = process.env.DATABASE_URL || config.database.default;
client = new pg.Client(connectionString);

bootstrapApp = () => {
	var app = express();

	app.use(jwt({secret: 'SECRET'}).unless({
		path: [/\/tracking\/*/, /\/payments\/*/, /\/servers\/*/]
	}));

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	loginRoutes(app);
	app.use('/tracking', trackingRoutes);
	app.use('/payments', paymentsRoutes);
	app.use('/servers', appServerRoutes);

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
