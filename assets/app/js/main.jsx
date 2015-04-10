import React from 'react';
import HelloWorld from '../../../components/helloWorld.jsx';
import HelloName from '../../../components/helloName.jsx';
import Lifecycle from '../../../components/lifecycle.jsx';

(function() {
	var mountNode = document.getElementById('app');
	React.render(<HelloWorld />, mountNode);
})();