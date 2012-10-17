(function(global) {

	function Library(name) {
		this.name = name;
	}
	Library.prototype = {
		constructor: Library;
	};

	function lib(name) {
		return new Library(name);
	}

})(this);
