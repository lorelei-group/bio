var Set = Base.proto({

	type: 'Set',

	init: function() {
		this.byHash = {};
		this.items = [];
		return Base.init.call(this);
	},

	length: function() {
		return this.items.length;
	},

	get: function(index) {
		return this.items[index];
	},

	getAll: function() {
		return this.items;
	},

	has: function(element) {
		return typeof this.byHash[element.hash()] === 'number';
	},

	add: function(element) {
		if (this.has(element)) return;

		var index = this.byHash[element.hash()] = this.items.length;
		this.items[index] = element;

		return this;
	},

	remove: function(element) {
		if (!this.has(element)) return;

		var hash = element.hash(),
			index = this.byHash[hash];

		this.byHash[hash] = null;
		delete this.byHash[hash];

		Array.remove(this.items, index);
		return this;
	},

	merge: function(array) {
		for (var i = array.length; i--; )
			this.add(array[i]);
	}
});
