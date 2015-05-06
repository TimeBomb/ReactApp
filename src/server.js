import _ from 'LoDash';
import Hapi from 'hapi';

function initializeRoutes(server) {
	var routes = require('./routes.jsx');
	_.forEach(routes, function(routeObject) {
		server.route(routeObject);
	});
}

function initializeServerConnection(server, options) {
	server.connection({
		port: options.port
	});
}

function FrontendServer(options) {
	var server = new Hapi.Server();
	var api = {};

	initializeServerConnection(server, options);
	initializeRoutes(server);

	api.start = function start() {
		server.start();
		console.log('Frontend listening on port ' + options.port);
	};

	return api;
}

export default FrontendServer;
