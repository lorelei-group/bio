var Element = Base.proto({
	type: 'Element',

	destroyed: false,

	init: function(x, y, diameter) {
		this.location = Vector.proto().init(x || 0, y || 0);
		this.diameter = diameter || 1;
		return Base.init.call(this);
	},

	getX: function() { return this.location.x; },
	setX: function(value) { this.location.x = value; },
	getY: function() { return this.location.y; },
	setY: function(value) { this.location.y = value; },

	getStartX: function() {
		return this.location.x - this.diameter / 2;
	},
	getStartY: function() {
		return this.location.y - this.diameter / 2;
	},

	getEndX: function() {
		return this.location.x + this.diameter / 2;
	},
	getEndY: function() {
		return this.location.y + this.diameter / 2;
	},

	getPosition: function() {
		return this.location.clone();
	},
	setPosition: function(x, y) {
		this.location.x = x;
		this.location.y = y;
	},

	testCollision: function(target) {
		return (
			this.distance(target) < target.diameter + this.diameter
			/*
			this.getStartX() < target.getEndX() &&
			this.getStartY() < target.getEndY() &&
			this.getEndX() > target.getStartX() &&
			this.getEndY() > target.getStartY()
			*/
		);
	},

	distance: function(target) {
		if (target.location)
			target = target.location;

		var diff = this.location.diff(target),
			result = diff.getHypotenuse();

		diff.dispose();
		return result;
	},

	angle: function(target) {
		if (target.location)
			target = target.location;

		var diff = this.location.diff(target),
			result = diff.getAngle();

		diff.dispose();
		return result;
	},

	destroy: function() {
		this.destroyed = true;
	}
});
