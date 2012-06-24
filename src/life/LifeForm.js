var LifeForm = Physics.proto({

	type: 'LifeForm',
	parents: null,

	init: function(x, y, diameter) {
		this.alive = true;
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

	_getHash: funct('hash'),

	setParents: function(var_args) {
		var parents = Array.fromArgs(arguments).map(this._getHash);
		this.parents = parents;
		this.isParent = function(target) {
			return parents && parents.indexOf(target.hash()) !== -1;
		};
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
