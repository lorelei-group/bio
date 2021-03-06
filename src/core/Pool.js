/*
(function(global) {

	function empty() { };

	var Pool = Base.proto({

		type: 'Pool',
		pool: [],
		prototype: null,

		Array: {
			get: function() {
				var tmp = [];
				tmp.dispose = empty;
				return tmp;
			},
		},
		Object: {
			get: function() {
				return { dispose: empty };
			},
			dispose: empty
		},

		init: function(prototype) {
			this.pool = Pool.Array.get();
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

	/*

	function print() {
		document.title =
			'Arrays: ' + Pool.Array.getted / Pool.Array.disposed + ' - ' +
			'Objects: ' + Pool.Object.getted / Pool.Object.disposed;
	}

	var NativePool = Pool.proto({

		init: function(creator) {
			this._disposeMethod = this._getDisposeMethod();
			this.pool = [];
			this._create = creator;
			return this;
		},

		getted: 0,
		disposed: 0,

		get: function() {
			var obj = this._retrieve();
			obj.dispose = this._disposeMethod;
			this.getted++;
			print();
			return obj;
		},

		dispose: function(obj) {
			this.disposed++;
			print();
			this.clean(obj);
			Pool.dispose.call(this, obj);
		}
	});


	Pool.Array = NativePool.proto({

		type: 'ArrayPool',

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

		type: 'ObjectPool',

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
	*

	global.Pool = Pool;

})(this);
*/
