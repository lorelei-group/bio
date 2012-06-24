var LifeForm = Physics.proto({
	type: 'LifeForm',

	parents: null,

	init: function(x, y, diameter) {
		this.alive = true;
		this.isParent = this.isParent.bind(this);
		return Physics.init.call(this, x, y, diameter);
	},


	isDead: function() {
		return !this.alive;
	},

	die: function() {
		if (this.isDead())
			return;

		this.alive = false;
		this.fireEvent('die', this);

		// Until implement dead body dead() is destroy()
		this.destroy();
	},

	isParent: function(target) {
		return false;
	},

	setParents: function(var_args) {
		var parents = Array.fromArgs(arguments);
		parents.forEach(this._removeParentWhenDead);

		this.parents = parents;
		this.isParent = function(target) {
			return parents && parents.indexOf(target) !== -1;
		};
	},

	_removeParentWhenDead: function(parent, index, array) {
		parent.once('die', function() {
			Array.remove(array, index);
		})
	},

	isFamily: function(target) {
		// target, I'm your father
		if (this.isParent(target) || target.isParent(this))
			return true;

		if (!this.parents || !target.parents)
			return false;

		// Brothers share parents
		return target.parents.some(this.isParent);
	}
});
