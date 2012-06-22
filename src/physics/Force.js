var IForce = Interface({
	// Direction
	getDirection: signature().returns(Number),
	setDirection: signature(Number).returns(),
	modifyDirection: signature(Number).returns(Number),

	// Direction in radians
	getRadians: signature().returns(Number),
	setRadians: signature(Number).returns(),

	// Strength
	getStrength: signature().returns(Number),
	setStrength: signature(Number).returns(),
	modifyStrength: signature(Number).returns(Number),

	// Vector
	getVector: signature().returns(IVector),

	// Operators
	equals: signature('IForce').returns(Boolean),
	clone: signature().returns('IForce'),
	merge: signature('IForce').chain()
});

var Force = IForce(Base.extend({
	direction: null,
	strength: 0,


	init: function() {
		this.direction = Vector.extend().init(0, 0);

	}
}))
