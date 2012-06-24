Array.remove = function(array, index) {
	for (var i = index, len = array.length; i < len; i++)
		array[i] = array[i + 1];
	array.length--;
};
Array.fromArgs = function(args, from) {
	from = from || 0;
	var target = Pool.Array.get();
	for (var i = from, len = args.length; i < len; i++)
		target[i] = args[i - from];
	return target;
};

Array.prototype.map = function(action) {
	var result = Pool.Array.get();

	for (var i = 0, len = this.length; i < len; i++)
		result[i] = action(this[i]);

	return result;
};

Array.prototype.filter = function(condition) {
	var result = Pool.Array.get();

	for (var i = 0, len = this.length; i < len; i++)
		if (condition(this[i]))
			result.push(this[i]);

	return result;
};

//Array.prototype.some
