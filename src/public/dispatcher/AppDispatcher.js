define(function (require) {
    var Dispatcher = require('flux').Dispatcher,
        AppDispatcher = new Dispatcher();
    return AppDispatcher;
});