(function(global) {

	var Pool = Base.proto({
		pool: [],
		prototype: null,

		init: function(prototype) {
			this.prototype = prototype;
			prototype.pool = this;
			prototype.dispose = this._getDisposeMethod();
		},

		get: function() {
			return this.clean(this._retrieve());
		},

		dispose: function(obj) {
			this.pool.push(obj);
		},

		clean: function(obj) {
			return obj;
		},

		_retrieve: function() {
			if (this.pool.length)
				return this.pool.pop();
			return this._create();
		},

		_create: function() {
			return this.prototype.proto();
		},

		_getDisposeMethod: function() {
			var self = this;
			return function() {
				self.dispose(this);
			};
		}
	});

	var NativePool = Pool.proto({

		init: function(creator) {
			var disposable = this._getDisposeMethod();

			this._create = function() {
				var instance = creator();
				instance.dispose = disposable;
				return instance;
			};

			return this;
		},

		get: function() {
			return this._retrieve();
		},

		dispose: function(obj) {
			this.clean(obj);
			Pool.dispose.call(this, obj);
		}
	});


	Pool.Array = NativePool.proto({

		clean: function(array) {
			for (var i = 0, len = array.length; i < len; i++)
				if (array[i].dispose)
					array[i].dispose();
			array.length = 0;
			return array;
		}

	}).init(function() { return [] });


	var hasOwn = Object.prototype.hasOwnProperty;
	Pool.Object = NativePool.proto({

		clean: function(obj) {
			for (var i in obj) {
				if (hasOwn.call(obj, i)) {
					if (obj[i].dispose)
						obj[i].dispose();
					obj[i] = null;
					delete obj[i];
				}
			}
			return obj;
		}

	}).init(function() { return {} });


	global.Pool = Pool;

})(this);
