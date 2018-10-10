var express = require('express'),
	loginRoutes = require('./api/routes/loginRoutes'),
	trackingRoutes = require('./api/routes/trackingRoutes'),
	paymentsRoutes = require('./api/routes/paymentsRoutes'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 5001,
	yaml = require('js-yaml'),
	fs = require('fs');

config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var pg = require('pg'),
	connectionString = process.env.DATABASE_URL || config.database.default;
client = new pg.Client(connectionString);

bootstrapApp = () => {
	var app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	loginRoutes(app);
	app.use('/tracking', trackingRoutes);
	app.use('/payments', paymentsRoutes);

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
