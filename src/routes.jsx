import Path from 'path';
import FS from 'fs';
import Url from 'url';
import React from 'react';
import Router from 'react-router';
import App from './components/Core/app.jsx';
import Routes from './components/Core/routes.jsx';

var routes = {};

routes.app = {
    method: '*',
    path: '/{param*}',
    handler: function(request, reply) {
        var url = Url.parse(request.raw.req.url).pathname;
        console.log(url);
        var router = Router.create({
            routes: Routes,
            location: url,
        });
        router.run(function(Handler, state) {
            var content = React.renderToString(<Handler path={url} />);
            reply(content);
        });
    }
};

routes.assets = {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: './dist'
        }
    }
};

routes.favicon = {
    method: 'GET',
    path: '/favicon.ico',
    handler: {
        file: './dist/img/favicon.ico'
    },
    config: {
        cache: {
            expiresIn: 86400000,
            privacy: 'public'
        }
    }
};

export default routes;
