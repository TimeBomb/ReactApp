import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
	render: function() {
		return (
			<ul>
				<li><Link to="world">Hello World</Link></li>
				<li><Link to="name">Hello Name</Link></li>
				<li><Link to="person">Hello Person</Link></li>
				<li><Link to="lifecycle">Lifecycle</Link></li>
			</ul>
		);
	}
});