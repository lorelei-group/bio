var Vector = Base.proto({
	//
	// Base methods
	//

	init: function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
		return Base.init.call(this);
	},

	equals: function(target) {
		return this.x === target.x && this.y === target.y;
	},

	clone: function() {
		return Vector.proto().init(this.x, this.y);
	},

	isZero: function() {
		return this.x === 0 && this.y === 0;
	},


	//
	// Operator methods
	//

	_roundCache: {},
	round: function(decimals) {
		operator = this._roundCache[decimals];
		if (!operator) {
			var dec = typeof decimals === 'number' ? decimals : 2;
			operator = this._roundCache[decimals] = Math.pow(10, dec);
		}

		this.x = Math.round(this.x * operator) / operator;
		this.y = Math.round(this.y * operator) / operator;

		return this;
	},

	abs: function() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	},

	add: function(val) {
		this.x += val;
		this.y += val;
		return this;
	},

	multiply: function(val) {
		this.x *= val;
		this.y *= val;
		return this;
	},

	merge: function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	},

	diff: function(vector) {
		return Veector.proto().init(this.x - vector.x, this.y - vector.y);
	},


	//
	// Math methods
	//

	getHypotenuse: function() {
		if (this.isZero())
			return 0;
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2), 2)
	},

	getAngle: function() {
		var angle = this.getRadians() / Math.PI * 180;

		while (angle < 0)
			angle += 360;

		return angle % 360;
	},

	setAngle: function(value) {
		value = value % 360;

		if (value < 0)
			value += 360;

		this.setRadians(value * Math.PI / 180);
	},

	getRadians: function() {
		if (this.isZero())
			return 0;

		var arctan = Math.atan(this.y / this.x);

		if (arctan < 0)
			arctan += Math.PI;

		if (this.y < 0 || (this.y === 0 && this.x < 0))
			arctan += Math.PI;

		return arctan;
	},

	setRadians: function(value) {
		// IT RESETS VECTOR HYPOTENUSE TO 1
		this.x = Math.cos(value);
		this.y = Math.sin(value);
	},

	toString: function() {
		return "[object Vector] { x: " + this.x + ", y: " + this.y + " }";
	}
});
