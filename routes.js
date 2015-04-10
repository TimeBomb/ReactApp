var Path = require('path');
var FS = require('fs');
var routes = {};

routes.home = {
    method: '*',
    path: '/',
    handler: function(request, reply) {
        var viewFile = Path.resolve('./views/main.html');
        FS.readFile(viewFile, {
            encoding: 'utf8'
        }, function(error, data) {
            if (error) {
                console.error('[App Route Error] ', error);
            }
            reply(data);
        });
    }
};

routes._assets = {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: './assets'
        }
    }
};

routes._404 = {
	method: '*',
	path: '/{param*}',
	handler: function routeNotFoundHandler(request, reply) {
		return reply('The page was not found').code(404);
	}
};

module.exports = routes;