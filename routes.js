/*jslint node: true */
'use strict';

import Path from 'path';
import FS from 'fs';
import React from 'react';
import App from './assets/app/js/app.jsx';
import Routes from './assets/app/js/routes.jsx';
import Router from 'react-router';
import Url from 'url';

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

routes._assets = {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: './assets'
        }
    }
};

export default routes;
