(function(global) {

	var Emitter = Base.proto({

		init: function() {
			this.listeners = Pool.Object.get();
			return this;
		},

		on: function(signal, handler) {
			if (!this.listeners[signal])
				this.listeners[signal] = Pool.Array.get();
			this.listeners[signal].push(handler);
		},

		off: function(signal, handler) {
			if (!this.listeners[signal])
				return;

			var list = this.listeners[signal];
				index = list.indexOf(handler);

			if (index !== -1)
				Array.remove(list, index);
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
					Array.fromArgs(arguments, 1) : null;

			for (var i = 0, len = list.length; i < len; i++)
				list[i].apply(null, args);
		}
	});

	var parent = Base;
	global.Base = Base.proto({
		init: function() {
			this.emitter = Emitter.proto().init();
			return parent.init.call(this);
		},

		on: function(signal, handler) {
			this.emitter.on(signal, handler);
		},

		off: function(signal, handler) {
			this.emitter.off(signal, handler);
		},

		once: function(signal, handler) {
			this.emitter.once(signal, handler);
		}
	});

})(this);
