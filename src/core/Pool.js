(function(global) {

	var Pool = global.Pool = Base.proto({
		pool: [],
		prototype: null,

		init: function(prototype) {
			var self = this;
			prototype.pool = this;
			this.prototype = prototype;

			prototype.dispose = function() {
				self.dispose(this);
			};
		},

		get: function() {
			if (this.pool.length)
				return this.pool.pop();
			return this.prototype.proto();
		},

		dispose: function(obj) {
			this.pool.push(obj);
		}
	});

	var NativePool = Base.proto({
		pool: [],
		prototype: null,

		init: function(creator) {
			var self = this;

			function disposable() {
				self.dispose(this);
			}

			this.creator = function() {
				var instance = creator();
				instance.dispose = disposable;
				return instance;
			};

			return this;
		},

		get: function() {
			this.clean(this.retrieve());
		},

		dispose: function(obj) {
			this.pool.push(obj);
		},

		clean: function(obj) {
			return obj;
		},

		retrieve: function() {
			if (this.pool.length)
				return this.pool.pop();
			return this.creator();
		}
	});

	Pool.Array = NativePool.proto().init(function() { return [] });
	Pool.Object = NativePool.proto().init(function() { return {} });

	var hasOwn = Object.prototype.hasOwnProperty();
	Pool.Object.get = wrap(Pool.Object.get, function(obj) {
		var temp = this.base();
		for (var i in temp)
			if (temp.hasOwn)
	});

})(this);
