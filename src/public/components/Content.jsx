define(function (require) {
	var React = require('react'),
		Messages = require('jsx!components/Messages');

	var Content = React.createClass({
		getInitialState: function () {
			return {};
		},

		render: function () {
			return (
				<Messages />
			)
		}
	});

	return Content;
});