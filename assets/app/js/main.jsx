/*jslint node: true */
'use strict';

import React from 'react';
import Router from 'react-router';
import Routes from './routes.jsx';

document.addEventListener('DOMContentLoaded', function() {
	var mountNode = document;
	Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
		React.render(<Handler />, mountNode);
	});
	console.log('clientside routing initialized');
});