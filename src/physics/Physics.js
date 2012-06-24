var Physics = Element.proto({
	type: 'Physics',

	init: function(x, y, diameter) {
		this.movement = Force.proto().init(0, 0);
		return Element.init.call(this, x, y, diameter);
	},


	getDirection: function() {
		return this.movement.getDirection();
	},
	setDirection: function(degree) {
		this.movement.setDirection(degree);
	},
	modifyDirection: function(degree) {
		this.movement.modifyDirection(degree);
	},

	getVelocity: function() {
		return this.movement.getStrength();
	},
	setVelocity: function(value) {
		this.movement.setStrength(value);
	},
	modifyVelocity: function(addition) {
		this.movement.modifyStrength(addition);
	},

	getNextPosition: function() {
		var vector = this.movement.getVector(),
			result = this.location.clone().merge(vector);
		vector.dispose();
		return result;
	},

	_move: function() {
		var vector = this.movement.getVector();
		this.location.merge(vector);
		vector.dispose();
	},
	move: function() {
		this._move();
		this.emitter.emit('move', this, this.location.x, this.location.y);
	},

	shove: function(degrees, strength) {
		if (isPrototype(Force, degrees)) {
			this.movement.merge(degrees);
			return;
		}

		var force = Force.proto().init(degrees, strength * (1 - this.weight));
		this.movement.merge(force);
		force.dispose();
	},

	accelerate: function(force) {
		this.movement.modifyStrength(force);
	},

	brake: function(force) {
		var vel = this.movement.getStrength() - force;
		if (vel < 0)
			vel = 0;
		this.movement.setStrength(vel);
	},

	stop: function() {
		this.movement = Force.proto().init(0, 0);
	},

	isStopped: function() {
		return Math.round(this.movement.getStrength() * 10) === 0;
	}
});
