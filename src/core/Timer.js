var Timer = Base.proto({
	interval: 1000,
	id: null,

	init: function(interval) {
		this.interval = interval || this.interval;
		this.tick = this.tick.bind(this);
		return Base.init.call(this);
	},

	dispose: function() {
		if (this.id)
			this.stop();
		Base.dispose.call(this);
	},

	once: function() {
		var prom = Promise.Cancellable.proto({
			cancel: function() {
				clearTimeout(id);
			}
		}).init();

		var id = setTimeout(function() {
			prom.complete();
			prom.dispose();
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


