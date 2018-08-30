var express = require('express'),
	path = require('path'),
	routes = require('./api/routes/todoListRoutes'),
	bodyParser = require('body-parser'),
	{Pool} = require('pg'),
	app = express(),
	port = process.env.PORT || 5000,
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}),
	client = pool.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('App successfully started on port ' + port);
