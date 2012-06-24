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

		init: function() {
			this[state] = States.open;
			this[onDone] = Pool.Array.get();
			this[onError] = Pool.Array.get();
			return Base.init.call(this);
		},

		then: function(onDone, onError, onProgress) {
			if (typeof onDone === 'function')
				this[onDone].push(onDone);

			if (typeof onError === 'function')
				this[onError].push(onError);

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
