import React from 'react';

export default React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			person: { name: 'someone' }
		};
	},
    render: function render() {
        return (
            <div>
                Hello {this.props.person.name}.
            </div>
        );
    }
});