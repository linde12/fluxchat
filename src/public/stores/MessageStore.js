define(function (require) {
	var AppDispatcher = require('../dispatcher/AppDispatcher'),
		EventEmmiter = require('events'),
		IoHandler = require('../IoHandler'),
		messages = [];

	var MessageStore = function () {
		var self = this;

		this.alias = "guest" + +new Date();

		IoHandler.on('message', function (message) {
			messages.push(message);
			self.emitChange();
		});

		IoHandler.on('assign-alias', function (alias) {
			self.alias = alias;
		});
	};

	// This is a mess... TODO: Look at a better way of doing this with a static store
	MessageStore.prototype = EventEmmiter.prototype;

	MessageStore.prototype.getMessages = function () {
		return messages;
	};

	MessageStore.prototype.emitChange = function () {
		this.emit('change');
	};

	MessageStore.prototype.addChangeListener = function (callback) {
		this.on('change', callback);
	};

	function addMessage (message) {
		IoHandler.emit('message', message);
		messages.push(message);
	};

	var messageStore = new MessageStore();

	AppDispatcher.register(function (payload) {
		var action = payload.action;

		switch(payload.actionType) {
			case "ADD_MESSAGE":
				addMessage(action);
				break;

			default:
				return true;
		}

		messageStore.emitChange();
		return true;
	});

	return messageStore;
});