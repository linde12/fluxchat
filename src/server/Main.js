(function () {
    var App = {
        start: function () {
            var express = require('express'),
                app = express(),
                http = require('http').Server(app);
                io = require('socket.io')(http),
                people = {};

            // Static files in public, the actual front end
            app.use(express.static(__dirname + '/../public'));


            // Don't h8 disclaimer:
            // The following is very ugly, i know
            // but it's just to make this example work,
            // the server side code(not even much of the client 
            // side code, just trying to show the flux pattern with react here)
            // in the project is nothing to use as a good reference
            io.on('connection', function (socket) {
                var name = socket.client.conn.remoteAddress;
                console.log("User connected", name);
                socket.emit('assign-alias', name);

                // Notify other users about new user connecting
                socket.broadcast.emit('message', {
                    alias: 'Server',
                    text: 'User [' + name + '] has connected.'
                });

                // Add to people object & emit to clients
                people[socket.id] = name;
                io.emit('people', people);

                // Welcome the new user
                socket.emit('message', {
                    alias: 'Server',
                    text: 'Welcome to the best & most advanced chat ever seen!'
                });

                socket.on('message', function (message) {
                    console.log("Received", message);
                    if (message.text && message.alias && message.alias === name && message.alias.indexOf("Server") === -1) {
                        socket.broadcast.emit('message', message);
                        if (message.text.indexOf("echo ") === 0) {
                            message.alias = "Echo";
                            message.text = message.text.replace("echo ", "");
                            io.emit('message', message);
                        }
                    }
                });

                socket.on('disconnect', function () {
                    console.log("User disconnected");
                    io.emit('message', {
                        alias: 'Server',
                        text: 'User [' + people[socket.id] + '] has disconnected.'
                    });

                    if (people[socket.id]) {
                        delete people[socket.id];
                    }
                    io.emit('people', people);
                });
            });
            http.listen(8000);
        }
    };

    App.start();
}());