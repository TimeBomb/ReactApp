import React from 'react';
import Nav from '../../../components/nav.jsx';
import Router from 'react-router';
import { RouteHandler } from 'react-router';

export default React.createClass({
	render: function() {
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>React Full Stack Demo</title>
					<script src="assets/bundle/app.js"></script>
				</head>
				<body>
					<Nav />
					<RouteHandler />
				</body>
			</html>
		);
	}
 });