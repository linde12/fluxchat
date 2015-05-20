define(function (require) {
	var React = require('react'),
		MessageStore = require('../stores/MessageStore');

	var Header = React.createClass({
		getInitialState: function () {
			return {
				noOfMessages: MessageStore.getMessages().length
			};
		},

		componentDidMount: function () {
			MessageStore.addChangeListener(this.onChange);
		},

		onChange: function () {
			this.setState({
				noOfMessages: ++this.state.noOfMessages
			});
		},

		render: function () {
			return (
				<div>Header - {this.state.noOfMessages} messages</div>
			)
		}
	});

	return Header;
});