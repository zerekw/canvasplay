var Grid = function (size, hexSize) {
	this.canvas = dojo.byId('canvas');
	this.ctx = this.canvas.getContext('2d');
	
	this.clickPos = {};

	this.hex = {}
	this.hex.size = 50;
	this.hex.orientation = 1;
	this.hex.pos = this.buildHex(this.hex.size);
	this.hex.filled = false;

	this.rows = 5;
	this.columns = 4;

	if (this.hex.orientation) {
		dojo.attr(this.canvas, {
			'width' : (this.hex.width * 2 ) * this.columns,
			'height': (this.hex.height * 2 - this.hex.b) * this.rows
		});
	} else {
		dojo.attr(this.canvas, {
			'width' : (this.hex.width * 2 - this.hex.b) * this.columns,
			'height': (this.hex.height * 2 ) * this.rows
		});
	}

	console.log(this.hex);
};

Grid.prototype.draw = function () {
	console.log('drawing...');
	this.ctx.clearRect(0,0,550,550);
	this.ctx.fillStyle = "rgba(100,100,100, .4)";
	this.ctx.strokeStyle = "rgb(200,200,200)";
	this.ctx.lineWidth = 5;
	this.drawGrid();
	this.ctx.lineWidth =1;
	this.ctx.strokeStyle = "rgb(0,0,0)";
	this.drawGrid();
};

Grid.prototype.drawGrid = function () {
	var row1 = {},
	    row2 = {};
	this.hex.filled = false;
	for (y=0;y<=this.rows;y++) {
		for (x=0;x<=this.columns;x++) {
			row1.x = this.hex.xSpacing * x;
			row1.y = this.hex.ySpacing * y;
			row2.x = row1.x + (this.hex.xSpacing / 2);
			row2.y = row1.y + (this.hex.ySpacing / 2);
			this.drawHex(row1.x, row1.y);
			this.drawHex(row2.x, row2.y);
		}
	}
return;
/*
			this.drawHex(this.hex.width * x, this.hex.height * y);
		}
		for (x=0;x<0;x++) {
			this.drawHex(+(80*x), 25+(y*50));
		}
	}
	*/
};

Grid.prototype.drawHex = function (gridX, gridY, fill) {
	var x, y;
	this.ctx.save();
	fill = false;
	this.ctx.translate(gridX, gridY);
	
	this.ctx.beginPath();
	var length = this.hex.pos.length;
	var p = null;
	for (var i = 0;i < length;i++) {
		p = this.hex.pos[i];
		this.ctx.lineTo(p.x, p.y);
	}
	this.ctx.closePath();

	if (fill)
		this.ctx.fill();
	this.ctx.stroke();
	this.ctx.restore();

};

Grid.prototype.buildHex = function (size) {
	var hex = [];
	var h = size;
	var a = Math.round(h/2); 
	var b = Math.round(h * Math.sin(Math.PI/3));
	var x = 5, y = h;

	this.hex.h = h;
	this.hex.a = a;
	this.hex.b = b;

	hex[0] = { x : x, y : y };

	if (this.hex.orientation) {
		/* East/West */
		this.hex.width = h * 2;
		this.hex.height = b * 2;
		this.hex.center = { x : x + h, y : y };
		this.hex.xSpacing = this.hex.width + this.hex.width / 2;
		this.hex.ySpacing = this.hex.height;
		hex[1] = { x : hex[0].x + a, y : hex[0].y - b };
		hex[2] = { x : hex[1].x + h, y : hex[1].y };
		hex[3] = { x : hex[2].x + a, y : hex[2].y + b };
		hex[4] = { x : hex[3].x - a, y : hex[3].y + b };
		hex[5] = { x : hex[4].x - h, y : hex[4].y };
	} else {
		/* North/South */
		this.hex.width = b * 2;
		this.hex.height = h * 2;
		this.hex.center = { x : x + b, y : y + a };
		this.hex.xSpacing = this.hex.width;
		this.hex.ySpacing = this.hex.height + this.hex.height / 2;
		hex[1] = { x : hex[0].x + b, y : hex[0].y - a };
		hex[2] = { x : hex[1].x + b, y : hex[1].y + a };
		hex[3] = { x : hex[2].x    , y : hex[2].y + h };
		hex[4] = { x : hex[3].x - b, y : hex[3].y + a };
		hex[5] = { x : hex[4].x - b, y : hex[4].y - a };
	}
	return hex;
};
