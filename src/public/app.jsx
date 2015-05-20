define(function(require){
    var React = require('react'),
        Header = require('jsx!components/header.jsx'),
        Content = require('jsx!components/content.jsx');

    function App() {
        this.AppView = React.createClass({
        render: function () {
            return (<div>
                <Header />
                <Content />
            </div>);
        }
        });
    }

    App.prototype.init = function () {
        React.render(<this.AppView />, document.body);
    };

    return App;
});