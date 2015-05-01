import React from 'react';
import Router from 'react-router';
import {
	Route,
	DefaultRoute
} from 'react-router';

import App from './app.jsx';
import HelloWorld from '../../../components/helloWorld.jsx';
import HelloName from '../../../components/helloName.jsx';
import HelloPerson from '../../../components/helloPerson.jsx';
import Lifecycle from '../../../components/lifecycle.jsx';

export default (
	<Route handler={App}>
		<Route name="world" handler={HelloWorld} />
		<Route name="name" handler={HelloName} />
		<Route name="person" handler={HelloPerson} />
		<Route name="lifecycle" handler={Lifecycle} />
		<DefaultRoute handler={HelloWorld} />
	</Route>
);