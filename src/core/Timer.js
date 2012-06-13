var ITimer = Interface({
	once: signature(Integer).returns(ICancellablePromise),
	start: signature().chain(),
	stop: signature().chain(),
	tick: signature().returns(null)
}).setName('ITimer');

var Timer = Base.extend({
	interval: 1000,
	id: null,

	init: function() {
		this.tick = this.tick.bind(this);
		return this.base();
	},

	once: function() {
		var prom = Promise.Cancellable.extend().init();
		var id = setTimeout(function() {
			prom.complete();
		}, this.interval);

		prom.cancel = function() {
			clearTimeout(id);
		};

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


