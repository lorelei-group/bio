function prop(name) {
	return function(obj) {
		return obj[name];
	}
}

function funct(name, var_args) {
	if (arguments.length === 1) {
		return function(obj) {
			return obj[name]();
		};
	} else {
		var args = Array.fromArgs(arguments, 1)
		return function(obj) {
			return obj[name].apply(obj, args);
		};
	}
}

function compose() {
	var args = Array.fromArgs(arguments);
	return function(obj) {
		var i = args.length,
			result = obj;
		while (i--)
			result = args[i](result);
		return result;
	}
}

function isPrototype(Type, object) {
	if (arguments.length === 2) {
		instanceOf.prototype = Type;
		return object instanceof instanceOf;
	}

	var self = function(object) {
		return object instanceof self;
	};
	self.prototype = Type;
	return self;
}
