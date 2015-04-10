import React from 'react';
import HelloWorld from '../../../components/helloWorld.jsx';
import HelloName from '../../../components/helloName.jsx';

(function() {
	var mountNode = document.getElementById('app');
	React.render(<HelloName />, mountNode);
})();