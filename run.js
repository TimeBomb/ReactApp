var serverOptions = {
	serverHost: '127.0.0.1',
	serverPort: 8081
};
var server = require('./server.js')(serverOptions);
server.start();