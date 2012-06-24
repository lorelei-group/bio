var Cell = Animal.proto({

	type: 'Cell',

	init: function(x, y, diameter) {
		this.baseColor = {
			r: NaN,
			g: NaN,
			b: NaN
		};

		// Reproduction factors
		this.factor['reproduce at size'] = 200;
		this.factor['mitosis split velocity'] = 5;

		return Animal.init.call(this, x, y, diameter);
	},


	canReproduce: function() {
		return this.getArea() > this.factor['reproduce at size'];
	},

	reproduce: function() {
		var child1 = this._createChild(),
			child2 = this._createChild(),
			direction = Math.round(Math.random() * 360),
			strength = this.factor['mitosis split velocity'];

		child1.shove(direction, strength);
		child2.shove(direction + 180, strength);

		this.emitter.emit('reproduce', this, child1, child2);
		this.destroy();
	},

	_createChild: function() {
		var child = Object.getPrototypeOf(this).proto().init();
		child.setPosition(this.location.x, this.location.y);
		child.diameter = this.diameter / 2;
		child.setParents(this);
		return child;
	}
});
