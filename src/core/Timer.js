var Timer = Base.proto({

	type: 'Timer',
	interval: 1000,
	id: null,

	init: function(interval) {
		this.interval = interval || this.interval;
		this.tick = this.tick.bind(this);
		return Base.init.call(this);
	},

	once: function() {
		var prom = Promise.Cancellable.proto({
			cancel: function() {
				clearTimeout(id);
			}
		}).init();

		var id = setTimeout(function() {
			prom.complete();
		}, this.interval);

		return prom;
	},

	start: function() {
		this.id = setInterval(this.tick, this.interval);
		return this;
	},

	stop: function() {
		clearInterval(this.id);
		this.id = null;
		return this;
	},

	tick: function() {
		this.emitter.emit('tick');
	}
});

(function() {

	var requestAnimFrame =
		window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback){
			return window.setTimeout(callback, 1000 / 60);
		};

	var cancelAnimFrame =
		window.cancelAnimationFrame       ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame    ||
		window.oCancelAnimationFrame      ||
		window.msCancelAnimationFrame     ||
		function(id){
			window.clearTimeout(id);
		};


	window.AnimationTimer = Base.proto({

		type: 'AnimationTimer',
		id: null,

		init: function() {
			this.tick = this.tick.bind(this);
			return Base.init.call(this);
		},

		start: function() {
			this.tick();
		},

		stop: function() {
			cancelAnimFrame(this.id);
			this.id = null;
			return this;
		},

		tick: function() {
			this.id = requestAnimFrame(this.tick);
			this.emitter.emit('tick');
		}
	});

})(this)
