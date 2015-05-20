define(function (require) {
	var AppDispatcher = require('../dispatcher/appdispatcher');
	return {
		addMessage: function (message) {
			AppDispatcher.dispatch({
				actionType: "ADD_MESSAGE",
				action: message
			});
		}
	}
});