var IPromise = Interface({
	init: signature().chain(),
	then: signature(Function, opt(Function), opt(Function)).chain(),
	complete: signature('...'),
	fail: signature(Object /* error */)
}).setName('IPromise');

var ICancellablePromise = Interface(IPromise, {
	cancel: signature().returns(Boolean)
}).setName('ICancellablePromise');


var Promise = IPromise(Base.extend({
	init: function() {
		this._onDone = [];
		this._onError = [];
		this._onProgress = [];
		return this.base();
	},

	then: function(onDone, onError, onProgress) {
		if (typeof onDone === 'function')
			this._onDone.push(onDone);

		if (typeof onError === 'function')
			this._onError.push(onError);

		return this;
	},

	complete: function(var_args) {
		for (var i = 0, len = this._onDone.length; i < len; i++)
			this._onDone[i].apply(null, arguments);
	},

	fail: function(error) {
		for (var i = 0, len = this._onError.length; i < len; i++)
			this._onError[i].call(null, error);
	}
}));

Promise.Cancellable = ICancellablePromise(Promise.extend({
	cancel: function() {
		return false;
	}
}));
