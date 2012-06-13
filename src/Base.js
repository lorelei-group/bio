var IBase = Interface({

	init: signature().returns('IBase'),

	config: signature().returns('IBase')

}).setName('IBase');


(function() {

	function addProperty(parent, value) {
		if (signature.isSignature(parent))
			return parent.wrap(value);

		if (typeof value !== 'function' || typeof parent !== 'function')
			return value;

		return function wrapper() {
			var original = this.base;
			this.base = parent;
			var result = value.apply(this, arguments);
			this.base = original;
			return result;
		};
	}

	function extend(config) {
		function intermediate() { }
		intermediate.prototype = this;
		var result = new intermediate();

		config = config || {};
		if (!this.extend && !config.extend)
			config.extend = extend;

		for (var i in config)
			if (config.hasOwnProperty(i))
				result[i] = addProperty(this[i], config[i]);

		return result;
	};

	window.Base = extend.call(Object.prototype, {
		base: function() { },

		init: function() {
			return this;
		},

		config: function() {
			return this;
		}
	});

	IBase(Base);

})();

