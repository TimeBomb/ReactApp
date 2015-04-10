import React from 'react';

export default React.createClass({
	// [Setup] Invoked once, before component is mounted
	getInitialState: function getInitialState() {
		console.log('getInitialState called');

		return {
			myInitialState: 'default value'
		};
	},

	// [Setup] Invoked once, cached when the class is created
	getDefaultProps: function getDefaultProps() {
		console.log('getDefaultProps called');

		return {
			myProp: 'default value'
		}
	},

	// Properties vs State: Properties are immutable, public, initialized on component creation, and validatable.
	// State is private to the component only, and should be thought of as an internal dataset that affects the rendering of the component.

	// [Mounting] Invoked once (only on the client), immediately after initial rendering occurs
	// Good place to do any initializations
	componentWillMount: function componentWillMount() {
		console.log('componentWillMount called');

		this.initializeMagic();
	},

	// [Mounting] Invoked when a component is receiving new props; will not be called for initial render
	componentWillReceiveProps: function componentWillReceiveProps() {
		console.log('componentWillReceiveProps called');

		if (this.getLatestMyProp() === 'bad') {
			console.warn('Bad things are about to happen');
		}
	},

	// [Updating] Invoked before redering when new props or state are being received; is not called for initial render
	// Can optimize app using this method; return false if you are certain you do not need to update component
	shouldComponentUpdate: function shouldComponentUpdate() {
		console.log('shouldComponentUpdate called');

		return this.doesNeedToUpdate();
	},

	// [Updating] Invoked immediately before rendering when new props/state are being received; not called for initial render
	// Use to prepare for an update
	componentWillUpdate: function componentWillUpdate() {
		console.log('componentWillUpdate called');

		console.warn('I\'MA FIRING MAH LAZERS');
	},

	// [Updating] Invoked immediately after component's updated on DOM; not called for initial render
	componentDidUpdate: function componentDidUpdate() {
		console.log('componentDidUpdate called');

		console.info('My laser fire sequence was a complete success.');
	},

	// [Unmounting] Invoked immediately before component is removed from DOM
	// Perform necessary cleanup here
	componentWillUnmount: function componentWillUnmount() {
		console.log('componentWillUnmount called');

		this.hideLasers();
	},

	render: function render() {
		return <div>Take a look at your developer console.</div>;
	},

	initializeMagic: function initializeMagic() {
		console.log('Now synergizing magic with code to make the world a better place.');
	},

	// Helper methods
	getLatestMyProp: function getLatestMyProp() {
		var numOneOrTwo = Math.floor(Math.random() * 2) + 1;
		return numOneOrTwo === 1 ? 'good' : 'bad';
	},

	doesNeedToUpdate: function doesNotNeedToUpdate() {
		return true;
	},

	hideLasers: function hideLasers() {
		console.info('Nothing to see here. Especially no lazers, no siree.')
	},
});