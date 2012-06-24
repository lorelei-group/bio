var Grid = Base.proto({
	columns: 10,
	rows: 10,
	cellSize: 10,

	init: function(columns, rows, cellSize) {
		this.columns = columns || this.columns;
		this.rows = rows || this.rows;
		this.cellSize = cellSize || this.cellSize;

		this._tickEveryCell = funct('forEach', funct('tick'));
		this.reset();
		return Base.init.call(this);
	},


	tick: function() {
		this.cells.forEach(this._tickEveryCell);
	},

	reset: function() {
		var row, j;

		if (this.cells)
			this.cells.dispose();

		this.cells = Pool.Array.get();

		for (var i = this.rows; i--; ) {
			row = Pool.Array.get();

			for (j = this.columns; j--; )
				row[j] = Set.proto().init();

			this.cells[i] = row;
		}

		this.width = this.columns * this.cellSize;
		this.height = this.rows * this.cellSize;
	},

	getCell: function(col, row) {
		return this.cells[row][col];
	},

	getCellAt: function(x, y) {
		return this.cells[
			Math.floor(y / this.cellSize)
		][
			Math.floor(x / this.cellSize)
		];
	},

	_calcRange: function(start, end, size, max) {
		var result = Pool.Object.get();

		if (end - start > size) {

			result.start = 0;
			result.end = max;

		} else {

			start %= size;
			if (start < 0)
				start += size;

			end %= size;
			if (end < start)
				end += size;

			result.start = Math.floor(start / this.cellSize);
			result.end = Math.ceil(end / this.cellSize);
		}

		return result;
	},

	getCellsAtZone: function(startX, startY, endX, endY) {
		var x = this._calcRange(startX, endX, this.width, this.columns),
			y = this._calcRange(startY, endY, this.height, this.rows),
			result = Pool.Array.get(),

			cols = this.columns,
			rows = this.rows,
			cells = this.cells,
			i, end, j, jend;

		for (i = x.start, end = x.end; i < end; i++)
			for (j = y.start, jend = y.end; j < jend; j++)
				result[result.length] = cells[i % cols][j % rows];

		x.dispose();
		y.dispose();

		return result;
	},

	getRangeFromZone: function(startX, startY, endX, endY) {
		var cells = this.getCellsAtZone(startX, startY, endX, endY);
		var result = Range.proto().init();

		for (var i = cells.length; i--; )
			result.merge(cells[i].getAll());

		cells.length = 0;
		cells.dispose();

		return result;
	}
});
