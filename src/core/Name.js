(function(global) {

	var used = { 'none': true };

	global.Name = {
		create: function() {
			var val = Math.random().toString();

			if (used[val])
				return this.create();

			used[val] = true;
			return val;
		}
	};

})(this);

