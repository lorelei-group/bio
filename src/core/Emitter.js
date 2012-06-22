(function() {

	var FakeArray = { proto: function() { return []; } };
	var ArrayPool = Pool.proto().init(FakeArray);

	var Emitter = Base.extend({

		init: function() {
			this.listeners = {};
			return this;
		},

		on: function(signal, handler) {
			if (!this.listeners[signal])
				this.listeners[signal] = [];
			this.listeners[signal].push(handler);
		},

		off: function(signal, handler) {
			if (!this.listeners[signal])
				return;

			var list = this.listeners[signal];
				index = list.indexOf(handler);

			if (index !== -1)
				list.splice(index, 1);
		},

		once: function(signal, handler) {
			var self = this;
			this.on(signal, function callee() {
				self.off(signal, callee);
				handler.apply(this, arguments);
			})
		},

		emit: function(signal, var_args) {
			if (!this.listeners[signal])
				return;

			var list = this.listeners[signal],
				args = arguments.length > 1 ?
					Array.prototype.slice.call(arguments, 1) : [];

			for (var i = 0, len = list.length; i < len; i++)
				list[i].apply(null, args);
		}
	});

	var delegateToEmitter = function(signal, handler) {
		this.emitter.on(signal, handler);
	};

	Base = IEventable(Base.extend({
		init: function() {
			this.emitter = Emitter.extend().init();
			return this;
		},

		on: delegateToEmitter,
		off: delegateToEmitter,
		once: delegateToEmitter
	}));

})();
