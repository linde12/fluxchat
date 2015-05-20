(function () {
    var App = {
        start: function () {
            var express = require('express'),
                app = express(),
                http = require('http').Server(app);
                io = require('socket.io')(http);

            // Static files in public, the actual front end
            app.use(express.static(__dirname + '/../public'));

            io.on('connection', function (socket) {
                console.log("User connected", socket.client.conn.remoteAddress);
                socket.emit('assign-alias', "[" + socket.client.conn.remoteAddress + "]");
                socket.emit('message', {
                    alias: '[Server]',
                    text: 'Welcome to the best & most advanced chat ever seen!'
                });

                socket.on('message', function (message) {
                    console.log("Received", message);

                    if (message.text && message.alias && message.alias.indexOf("[Server]") === -1) {
                        socket.broadcast.emit('message', message);
                        if (message.text.indexOf("echo ") === 0) {
                            message.alias = "[Echo]";
                            message.text = message.text.replace("echo ", "");
                            io.emit('message', message);
                        }
                    }
                });
            });
            http.listen(8000);
        }
    };

    App.start();
}());