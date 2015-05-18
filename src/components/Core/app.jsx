import React from 'react';
import ReactStylesheet from 'react-stylesheet';
import Nav from '../Nav/nav.jsx';
import { RouteHandler } from 'react-router';

export default React.createClass({
	mixins: [ReactStylesheet],

	stylesheets: [
		'assets/css/test.bundle.css'
	],

	render: function() {
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>React Full Stack Demo</title>
					<script src="assets/js/app.js"></script>
				</head>
				<body>
					<Nav />
					<RouteHandler />
				</body>
			</html>
		);
	}
 });