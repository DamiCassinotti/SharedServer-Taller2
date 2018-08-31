var express = require('express'),
	routes = require('./api/routes/todoListRoutes'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('App successfully started on port ' + port);
