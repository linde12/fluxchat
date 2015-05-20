define(function (require) {
	var Dispatcher = require('flux').Dispatcher;
	var AppDispatcher = new Dispatcher();
	return AppDispatcher;
});