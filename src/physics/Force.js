var Force = Base.proto({

	init: function(degrees, strength) {
		this.direction = Vector.proto().init(0, 0);
		this.strength = strength || 0;

		if (degrees)
			this.direction.setAngle(degrees);

		return Base.init.call(this);
	},


	getDirection: function() {
		return this.direction.getAngle();
	},
	setDirection: function(value) {
		this.direction.setAngle(value);
	},
	modifyDirection: function(addition) {
		this.direction.setAngle(this.direction.getAngle() + addition);
	},

	getRadians: function() {
		return this.direction.getRadians();
	},
	setRadians: function(value) {
		this.direction.setRadians(value);
	},


	getStrength: function() {
		return this.strength;
	},
	setStrength: function(val) {
		this.strength = val;
		this._fixStrength();
		return this;
	},
	modifyStrength: function(addition) {
		this.setStrength(this.getStrength() + addition);
		return this;
	},
	_fixStrength: function() {
		if (this.strength < 0) {
			this.direction.multiply(-1);
			this.strength *= -1;
		}
	},

	getVector: function() {
		return this.direction.clone().multiply(this.strength);
	},

	equals: function(target) {
		return this.getRadians() === target.getRadians() &&
			this.getStrength() === target.getStrength();
	},

	clone: function() {
		return Force.proto().init(this.getDirection(), this.getStrength());
	},

	merge: function(force) {
		var flow = this.getVector(),
			force = force.getVector();
		flow.merge(force);

		this.setRadians(flow.getRadians());
		this.setStrength(flow.getHypotenuse());

		return this;
	},

	toString: function() {
		return "[object Force] { direction: "; /*+ this.getDirection() +
			", strength: " + this.strength + "}";*/
	}
});
