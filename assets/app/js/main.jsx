import React from 'react';
import Home from '../../../components/home/home.jsx';

(function() {
	var mountNode = document.getElementById('app');
	React.render(<Home />, mountNode);
})();