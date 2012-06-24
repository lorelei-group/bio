var Locator = Base.proto({

	init: function(width, height) {
		this.locations = Pool.Object.get();
		this.setSize(width, height);
		return Base.init.call(this);
	},


	tick: function() {
		this.distanceCache.dispose()
		this.distanceCache = Pool.Object.get();
	},

	setSize: function(width, height) {
		this.width = width;
		this.height = height;

		this.halfWidth = width / 2;
		this.halfHeight = height / 2;
	},

	add: function(element, grid) {
		this.locations[element.hash()] = Pool.Array.get();
		this.updateLocation(element, grid);
	},

	remove: function(element) {
		var lastLocations = this.locations[element.hash()];

		for (var i=lastLocations.length; i--; )
			lastLocations[i].remove(element);

		lastLocations.length = 0;
		lastLocations.dispose();
	},

	getCellsAtElement: function(grid, element) {
		return grid.getCellsAtZone(
			element.getStartX(),
			element.getStartY(),
			element.getEndX(),
			element.getEndY()
		);
	},

	getRangeFromElement: function(grid, element, radius) {
		return grid.getRangeFromZone(
			element.getStartX() - radius,
			element.getStartY() - radius,
			element.getEndX() + radius,
			element.getEndY() + radius
		);
	},

	updateLocation: function(element, grid) {
		this._roundMap(element);

		var id = element.hash(),
			currentCells = grid.getCellsAtElement(element),
			lastCells = this.locations[id],


			remove = this._leftOnly(lastCells, currentCells),
			add = this._leftOnly(currentCells, lastCells);

		this.locations[id] = currentCells;

		// #TODO: not create functions on each iteration
		remove.forEach(funct('remove', element));
		add.forEach(funct('add', element));
	},

	_leftOnly: function(left, right) {
		// #TODO: filter should use array pool
		return left.filter(function(element) {
			return right.indexOf(element) !== -1;
		});
	},

	_roundMap: function(element) {
		var x = element.getX(),
			y = element.getY(),
			width = this.width,
			height = this.height;

		if (x < 0)
			element.setX(width + x);
		else if (x >= width)
			element.setX(x % width);

		if (y < 0)
			element.setY(height + y);
		else if (y >= height)
			element.setY(y % height);
	},

	distanceCache: {},
	getShorterDistance: function(element1, element2) {
		var id1 = element1.hash(),
			id2 = element2.hash(),
			cache = this.distanceCache[id1 + '-' + id2];

		if (cache)
			return cache;

		var location = this._calcRoundMapLocation(element1, element2),
			distance = element2.distance(location);

		this.distanceCache[id1 + '-' + id2] = distance;
		this.distanceCache[id2 + '-' + id1] = distance;

		location.dispose();
		return distance;
	},

	_calcRoundMapLocation: function(element1, element2) {
		var location1 = element1.getPosition(),
			location2 = element2.getPosition(),
			diff = location1.diff(location2);

		// if distance is bigger than half map, it will be shorter by a lateral of the map
		if (Math.abs(diff.x) > this.halfWidth)
			location1.x += this.halfWidth * this._getSigne(Math.round(diff.x) * -1);

		if (Math.abs(diff.y) > this.halfHeight)
			location1.y += this.halfHeight * this._getSigne(Math.round(diff.y) * -1);

		return location1;
	},

	_getSigne: function(value) {
		return Math.abs(value) / value;
	},

	getShorterAngle: function(element1, element2) {
		// TODO
		throw new Error();
	}
});
