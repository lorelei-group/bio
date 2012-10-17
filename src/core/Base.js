// #COMMIT Removed interfaces at 0c58bee4be0a92ecb12feae9588ccee56ce19104

(function(global) {

	var uniqueId = 1;

	global.Base = {

		type: 'Base',
		initialized: false,

		proto: function(config) {
			config || (config = {})
			config.__proto__ = this;

			// If 'this' is not Base we inject proto method
			if (!config.proto)
				config.proto = proto;

			return config;
		},

		init: function() {
			this.initialized = true;
			return this;
		},

		create: function() {
			var child = this.proto();
			child.init.apply(child, arguments);
			return child;
		}

		hash: function() {
			var hash = uniqueId++;
			this.hash = function() { return hash; };
			return hash;
		},

		getPrototype: function() {
			return Object.getPrototypeOf(this);
		},

		toString: function() {
			return '[object ' + this.type +']';
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
