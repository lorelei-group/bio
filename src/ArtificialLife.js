(function(global) {

	global.ArtificialLife = Base.proto({

		type: 'ArtificialLife',

		init: function() {
			declare();

			this._onCellReproduce = this._onCellReproduce.bind(this);

			this.timer = AnimationTimer.proto().init();
			this.timer.on('tick', this.tick.bind(this));

			this.map = MapConfig.proto().init();
			this.view = CanvasConfig.proto().init();
			this.elements = [];

			var cell = Type.proto().init(randomX(), randomY(), 10);
			cell.shove(random(360), random(50, 30));
			cell.hash = function() { return 'pepe' };
			cell.color = 'yellow';

			for (var i = 0, len = 10; i < len; i++)
				this.create(Herbivore);

			for (var i = 0, len = 1; i < len; i++)
				this.create(Carnivore);

			this._tickElement = this._tickElement.bind(this);
			this._printElement = this._printElement.bind(this);

			return Base.init.call(this);
		},

		create: function(Type) {
			var cell = Type.proto().init(randomX(), randomY(), 10);
			cell.shove(random(360), random(50, 30));
			return this.configure(cell);
		},

		configure: function(cell) {
			this.map.addElement(cell);
			cell.once('reproduce', this._onCellReproduce);
			this.elements.push(cell);
			return cell;
		},

		_tickElement: function(element) {
			element.tick(this.map);
		},

		_printElement: function(element) {
			this.view.print(element);
		},

		_onCellReproduce: function(element, child1, child2) {
			this.configure(child1);
			this.configure(child2);
		},

		tick: function() {
			this.elements.forEach(this._tickElement);

			this.view.clear();
			this.elements.forEach(this._printElement);
		},

		start: function() {
			//this.tick();
			this.timer.start();
		}
	});

	var cellSize = 10;
	var width, height;
	var TimerConfig, MapConfig, CanvasConfig, CellConfig;

	function declare() {
		// VARIABLES
		width = document.body.clientWidth;
		height = document.body.clientHeight;


		// CONFIGURATIONS
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
