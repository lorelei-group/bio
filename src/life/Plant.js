var Plant = LifeForm.proto({

	type: 'Plant',

	tick: function(map, context) {
		if (this.getArea() < 100)
			this.size.add(0.05);
	}
});
