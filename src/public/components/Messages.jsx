define(function (require) {
	var React = require('react'),
		MessageStore = require('../stores/MessageStore'),
		MessageActions = require('../actions/MessageActions');

	var Messages = React.createClass({
		getInitialState: function () {
			return {
				messages: MessageStore.getMessages()
			};
		},

		componentDidMount: function () {
			MessageStore.addChangeListener(this.onChange);
		},

		onChange: function () {
			this.setState(MessageStore.getMessages());
		},

		onKeyUp: function (evt) {
			if (evt.which === 13) {
				MessageActions.addMessage({
					alias: MessageStore.alias,
					text: evt.target.value
				});
				evt.target.value = "";
			}
		},

		render: function () {
			var rows = [];
			this.state.messages.map(function (message) {
				rows.push(<li>{message.alias}: {message.text}</li>);
			});
				
			return (
				<div>
					<ul>{rows}</ul><br />
					Message: <input onKeyUp={this.onKeyUp} type="text" />
				</div>
			)
		}
	});

	return Messages;
});