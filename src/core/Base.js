// #COMMIT Removed interfaces at 0c58bee4be0a92ecb12feae9588ccee56ce19104

(function(global) {

	var uniqueId = 1;

	global.Base = {

		initialized: false,
		disposed: false,

		proto: function(config) {
			if (!config) {
				config = Pool.Object.get();
				delete config.dispose;
			}

			config.__proto__ = this;

			if (!config.proto)
				config.proto = proto;

			return config;
		},

		init: function() {
			this.initialized = true;
			return this;
		},

		dispose: function() {
			// Totally non-sense, Pool.Object.dispose removes every property
			this.disposed = true;
			Pool.Object.dispose(this);
		},

		hash: function() {
			var hash = uniqueId++;
			this.hash = function() { return hash; };
			return hash;
		},

		getPrototype: function() {
			return Object.getPrototypeOf(this);
		}
	};

})(this);

/*
function wrap(base, funct) {
	return function() {
		var original = this.base;
		this.base = base;
		var result = funct.apply(this, arguments);
		this.base = original;
		return result;
	};
}
*/
