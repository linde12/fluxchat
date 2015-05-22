define(function (require) {
    var React = require('react'),
        MessageStore = require('../stores/MessageStore');

    var Header = React.createClass({
        getInitialState: function () {
            return {
                noOfMessages: MessageStore.getMessages().length,
                noOfPeople: MessageStore.getPeopleNames().length
            };
        },

        componentDidMount: function () {
            MessageStore.addChangeListener(this.onChange);
        },

        onChange: function () {
            this.setState({
                noOfMessages: MessageStore.getMessages().length,
                noOfPeople: MessageStore.getPeopleNames().length
            });
        },

        render: function () {
            return (
                <div>
                Header - {this.state.noOfMessages} message(s) - {this.state.noOfPeople} {this.state.noOfPeople > 1 ? 'people' : 'person'} connected</div>
            )
        }
    });

    return Header;
});