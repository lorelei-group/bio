(function(global) {

	var state = Name.create(),
		onDone = Name.create(),
		onError = Name.create();

	var States = {
		open: 1,
		done: 2,
		failed: 3
	};

	global.Promise = Base.proto({

		type: 'Promise',

		init: function() {
			this[state] = States.open;
			this[onDone] = [];
			this[onError] = [];
			return Base.init.call(this);
		},

		then: function(doneCallback, errorCallback) {
			if (typeof doneCallback === 'function')
				this[onDone].push(doneCallback);

			if (typeof errorCallback === 'function')
				this[onError].push(errorCallback);

			return this;
		},

		complete: function(var_args) {
			for (var i = 0, len = this[onDone].length; i < len; i++)
				this[onDone][i].apply(null, arguments);
		},

		fail: function(error) {
			for (var i = 0, len = this[onError].length; i < len; i++)
				this[onError][i].call(null, error);
		}
	});

	Promise.Cancellable = Promise.proto({
		cancel: function() {
			return false;
		}
	});

})(this);
