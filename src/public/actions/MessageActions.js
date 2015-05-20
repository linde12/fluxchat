define(function (require) {
	var AppDispatcher = require('../dispatcher/AppDispatcher');
	return {
		addMessage: function (message) {
			AppDispatcher.dispatch({
				actionType: "ADD_MESSAGE",
				action: message
			});
		}
	}
});