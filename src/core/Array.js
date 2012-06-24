Array.remove = function(array, index) {
	for (var i = index, len = array.length; i < len; i++)
		array[i] = array[i + 1];
	array.length--;
};
Array.fromArgs = function(args, from) {
	return Array.prototype.slice.call(args, from);
};
