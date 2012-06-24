var Canvas = Base.proto({
	width: 100,
	height: 100,

	init: function(width, height) {
		this.width = width || this.width;
		this.height = height || this.height;

		var dom = document.createElement('canvas');
		dom.width = this.width;
		dom.height = this.height;
		document.body.appendChild(dom);

		this.context = dom.getContext('2d')
		return Base.init.call(this);
	},

	clear: function() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	print: function(element) {
		var location = element.getPosition(),
			diameter = element.diameter,
			context = this.context;

		context.save();
		context.translate(location.x, location.y);

		context.beginPath();
		context.arc(0, 0, diameter / 2, 0, Math.PI * 2);
		context.fill();
		context.stroke();

		context.restore();
	}
});
