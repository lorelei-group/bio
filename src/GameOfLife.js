var GameOfLife = Base.extend({
	start: function() {
		var width = window.screen.width;
		var height = window.screen.height;
		var cellSize = 10;

		window.canvas = Canvas.extend()
			.init()
			.setSize(width, height);

		window.map = Map.extend()
			.init()
			.setCellSize(cellSize)
			.setColumns(width / cellSize)
			.setRows(height / cellSize);
	}
});
