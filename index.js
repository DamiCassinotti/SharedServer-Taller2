var express = require('express'),
	enviosRoutes = require('./api/routes/enviosRoutes'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 5000,
	yaml = require('js-yaml'),
	fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8')),
	pg = require('pg'),
 	connectionString = process.env.DATABASE_URL || config.database.default;
// client = new pg.Client(connectionString);
// client.connect();

enviosRoutes(app);

app.listen(port);

console.log('App successfully started on port ' + port);
