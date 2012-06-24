var Carnivore = Cell.proto({

	type: "Carnivore",
	food: [ isPrototype(Cell) ],
	baseColor: {
		r: 255,
		g: 0,
		b: NaN
	},

	init: function(x, y, diameter) {
		this.factor['reproduce at size'] = 20 * 20;
		return Cell.init.call(this, x, y, diameter);
	}
});
