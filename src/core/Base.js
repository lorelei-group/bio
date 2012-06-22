// #COMMIT Removed interfaces at 0c58bee4be0a92ecb12feae9588ccee56ce19104

(function(global) {

	function proto(config) {
		config || (config = {});
		config.__proto__ = this;

		if (!config.proto)
			config.proto = proto;

		return config;
	}

	function chain() {
		return this;
	}

	global.Base = {
		proto: proto,
		init: chain
	};

})(this);

function wrap(base, funct) {
	return function() {
		var original = this.base;
		this.base = base;
		var result = funct.apply(this, arguments);
		this.base = original;
		return result;
	};
}
