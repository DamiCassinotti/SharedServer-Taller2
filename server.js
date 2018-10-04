var express = require('express'),
	loginRoutes = require('./api/routes/loginRoutes'),
	pingRoutes = require('./api/routes/pingRoutes'),
	trackingRoutes = require('./api/routes/trackingRoutes'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 5001,
	yaml = require('js-yaml'),
	fs = require('fs');

const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var pg = require('pg'),
	connectionString = process.env.DATABASE_URL || config.database.default;
client = new pg.Client(connectionString);

bootstrapApp = () => {
	var app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	loginRoutes(app);
	pingRoutes(app);
	app.use('/tracking', trackingRoutes);

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
