var Map = Base.proto({
	cellSize: 10,
	columns: 10,
	rows: 10,

	init: function(cellSize, columns, rows) {
		this.cellSize = cellSize || this.cellSize;
		this.columns = columns || this.columns;
		this.rows = rows || this.rows;

		this.cells = Grid.proto().init();
		this.elements = Locator.proto().init();
		return Base.init.call(this);
	},

	tick: function() {
		this.elements.tick();
	},

	reset: function() {
		this._configureChilds();
		this.cells.reset();
		return this;
	},

	_configureChilds: function() {
		this.cells.cellSize = this.cellSize;
		this.cells.columns = this.columns;
		this.cells.rows = this.rows;
		this.cells.reset();

		this.elements.setSize(this.cellSize * this.columns, this.cellSize * this.rows);
	},


	addElement: function(element) {
		this.elements.add(element, this.cells);
	},

	removeElement: function(element) {
		this.elements.remove(element);
	},

	updateLocation: function(element) {
		this.elements.updateLocation(element, this.cells);
	},

	getShorterDistance: function(element1, element2) {
		return this.elements.getShorterDistance(element1, element2);
	},

	getShorterAngle: function(element1, element2) {
		return this.elements.getShorterAngle(element1, element2);
	},

	getRangeFromElement: function(element, radius) {
		return this.elements.getRangeFromElement(this.cells, element, radius);
	}
});
