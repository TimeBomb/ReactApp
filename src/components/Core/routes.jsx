import React from 'react';
import Router from 'react-router';
import {
	Route,
	DefaultRoute
} from 'react-router';

import App from './app.jsx';
import HelloWorld from '../HelloWorld/helloWorld.jsx';
import HelloName from '../HelloName/helloName.jsx';
import HelloPerson from '../HelloPerson/helloPerson.jsx';
import Lifecycle from '../Lifecycle/lifecycle.jsx';

export default (
	<Route handler={App}>
		<Route name="world" handler={HelloWorld} />
		<Route name="name" handler={HelloName} />
		<Route name="person" handler={HelloPerson} />
		<Route name="lifecycle" handler={Lifecycle} />
		<DefaultRoute handler={HelloWorld} />
	</Route>
);