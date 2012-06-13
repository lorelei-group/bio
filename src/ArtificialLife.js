(function() {

	window.ArtificialLife = Base.extend({
		a: 0,

		init: function() {
			this.timer = TimerConfig.extend();
			this.timer.on('tick', this.tick.bind(this));

			this.map = MapConfig.extend();

			return this.base();
		},

		tick: function() {
			console.log('pepe');
			this.a++;
			if (this.a > 10)
				this.timer.stop();
		},

		start: function() {
			this.timer.start();
		}
	});


	// VARIABLES
	var cellSize = 10;
	var width = window.screen.width;
	var height = window.screen.height;

	function instance(config) {
		return this.base(config).init();
	}


	// CONFIGURATIONS
	var TimerConfig = Timer.extend({
		extend: instance,
		interval: 1000 / 5
	})

	var MapConfig = Map.extend({
		extend: instance,
		cellSize: cellSize,
		columns: Math.floor(width / cellSize),
		rows: Math.floor(height / cellSize),
	});

})();
