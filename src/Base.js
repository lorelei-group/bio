(function() {

	function wrap(child, base) {
		return function() {
			var original = this.base;
			this.base = base;
			var result = child.apply(this, arguments);
			this.base = original;
			return result;
		};
	};

	function extend(config) {
		function intermediate() { }
		intermediate.prototype = this;
		var result = new intermediate();

		config = config || {};

		for (var i in config) {
			if (config.hasOwnProperty(i)) {
				if (typeof config[i] === 'function')
					result[i] = wrap(this[i], config[i], i)
				else
					result[i] = config[i];
			}
		}

		return result;
	};

	window.Base = extend.call(Object, {
		init: function() {
			return this;
		},

		config: function() {
			return this;
		}

		base: function() { }
	});

})()

var IBase = Interface({

	init: signature().returns(IBase),

	config: signature().returns(IBase)
});
