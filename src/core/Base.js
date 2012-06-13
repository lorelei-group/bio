var IBase = Interface({
	init: signature().chain(),
	is: signature(Object).returns(Boolean)
}).setName('IBase');


(function() {

	function intermediate() { }

	function addProperty(parent, value) {
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

	window.Base = IBase(extend.call(Object.prototype, {
		base: function() { },

		init: function() {
			return this;
		},

		is: function(parent) {
			if (typeof parent === 'function') {
				if (parent.isImplementedBy)
					return parent.isImplementedBy(this);
				else
					return this instanceof parent;
			}

			intermediate.prototype = parent;
			return this instanceof intermediate;
		}
	}));

})();

