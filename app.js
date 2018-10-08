const server = require('./server');

server.start((port) => {
	console.log('App successfully started on port ' + port);
})
