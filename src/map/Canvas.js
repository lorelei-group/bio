var Canvas = Base.proto({

	type: 'Canvas',
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

	_colors: [ 'r', 'g', 'b'],
	_defineColor: function(element) {
		var rgb = {},
			colors = this._colors,
			letter, base;

		for (var i = colors.length; i--; ) {
			letter = colors[i];
			base = element.baseColor[letter];
			rgb[letter] = isNaN(base) ? Math.round(Math.random() * 128) : base;
		}

		element.color = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
	},

	clear: function() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	print: function(element) {
		var location = element.getPosition(),
			force = element.movement.getVector().multiply(3),
			context = this.context;

		if (!element.hasOwnProperty('color'))
			this._defineColor(element);

		context.save();
		context.fillStyle = element.color;
		context.translate(location.x, location.y);

		context.beginPath();
		context.arc(0, 0, element.diameter / 2, 0, Math.PI * 2);
		context.fill();
		//context.stroke();

		//if (!force.isZero())
		{
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(force.x, force.y);
			context.stroke();

			context.fillStyle = 'blue';
			context.translate(force.x, force.y);
			context.arc(0, 0, 2, 0, Math.PI * 2);
			context.fill();
		}

		context.restore();
	}
});
