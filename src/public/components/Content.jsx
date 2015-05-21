define(function (require) {
    var React = require('react'),
        Messages = require('jsx!components/Messages'),
        MessageSidebar = require('jsx!components/MessageSidebar');

    var Content = React.createClass({
        getInitialState: function () {
            return {};
        },

        render: function () {
            return (<div>
                <MessageSidebar />
                <Messages />
            </div>)
        }
    });

    return Content;
});