define(function (require) {
    var React = require('react'),
        MessageStore = require('../stores/MessageStore');

    var MessageSidebar = React.createClass({
        getInitialState: function () {
            return {
                people: MessageStore.getPeople().map(function (person) { return person.name})
            };
        },

        componentDidMount: function () {
            MessageStore.addChangeListener(this.onChange);
        },

        onChange: function () {
            this.setState({
                people: MessageStore.getPeople().map(function (person) { return person.name})
            });
        },

        render: function () {
            var rows = [];
            this.state.people.forEach(function (name, index) {
                rows.push(<li className="person-item" key={index}>{name}</li>);
            });
            return (<div><h2>Active persons</h2><ul className="person-list">{rows}</ul></div>)
        }
    });

  return MessageSidebar;
});