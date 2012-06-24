(function(global) {

	global.ArtificialLife = Base.proto({

		init: function() {
			declare();

			this.timer = TimerConfig.proto().init();
			this.timer.on('tick', this.tick.bind(this));

			this.map = MapConfig.proto().init();
			this.view = CanvasConfig.proto().init();
			this.elements = [];

			for (var i = 0, len = 10; i < len; i++)
				this.elements.push(Animal.proto().init(randomX(), randomY(), 5));

			this._tickElement = this._tickElement.bind(this);
			this._printElement = this._printElement.bind(this);

			return Base.init.call(this);
		},

		_tickElement: function(element) {
			element.tick(this.map);
		},

		_printElement: function(element) {
			this.view.print(element);
		},

		tick: function() {
			this.elements.forEach(this._tickElement);

			this.view.clear();
			this.elements.forEach(this._printElement);
		},

		start: function() {
			this.tick();
			//this.timer.start();
		}
	});

	var cellSize = 10;
	var width, height;
	var TimerConfig, MapConfig, CanvasConfig;

	function declare() {
		// VARIABLES
		width = document.body.clientWidth;
		height = document.body.clientHeight;


		// CONFIGURATIONS
		TimerConfig = Timer.proto({
			interval: 1000 / 5
		})

		MapConfig = Map.proto({
			cellSize: cellSize,
			columns: Math.floor(width / cellSize),
			rows: Math.floor(height / cellSize),
		});

		CanvasConfig = Canvas.proto({
			width: width,
			height: height
		});
	}


	// HELPERS
	function randomX() {
		return random(width);
	}
	function randomY() {
		return random(height);
	}

	function random(max, min) {
		max = max || 1;
		min = min || 0;
		return Math.round(Math.random() * (max - min)) + min;
	}

})(this);
