import React from 'react';

export default React.createClass({
	getInitialState: function getInitialState() {
		return {
			name: 'stranger'
		};
	},

	handleChange: function handleChange(event) {
        // event.target.value is specifically necessary as value is the attribute name we're interested in of the element triggering the event
		this.setState({
			name: event.target.value
		});
	},

    render: function render() {
        return (
            <div>
            	<div>
            		<div>What is your name?</div>
            		<input type="text" value={this.state.name} onChange={this.handleChange} />
        		</div>
                <br />
                <span>Hello {this.state.name}.</span>
            </div>
        );
    }
});