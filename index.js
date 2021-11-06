const canvas = document.getElementById("circle");
const ctx = canvas.getContext("2d");

var screen, startArr;
var params = { speed: 2, count: 500, life: 5 };

setup();
update();

window.onresize = function () {
	setup();
};

function Star() {
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;
	this.z = Math.random() * canvas.width;

	this.r = Math.random() * 256;
	this.g = Math.random() * 256;
	this.b = Math.random() * 256;

	this.move = function () {
		this.z -= params.speed;

		if (this.z <= 0) {
			this.z = canvas.width;
		}
	};
	this.show = function () {
		let x, y, radius, opacity;
		radius = canvas.width / this.z;

		x = (this.x - screen.c[0]) * radius;
		x = x + screen.c[0];

		y = (this.y - screen.c[1]) * radius;
		y = y + screen.c[1];

		opacity = radius > params.life ? (2 - radius / params.life) * 1.5 : 1;
		ctx.beginPath();
		ctx.fillStyle =
			"rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + opacity + ")";
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	};
}

function setup() {
	screen = {
		w: window.innerWidth,
		h: window.innerHeight,
		c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
	};
	window.cancelAnimationFrame(update);
	canvas.width = screen.w;
	canvas.height = screen.h;
	startArr = [];
	starColors = [];

	for (var i = 0; i < params.count; i++) {
		startArr[i] = new Star();
	}
}

function update() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	startArr.forEach(function (s) {
		s.show();
		s.move();
	});
	window.requestAnimationFrame(update);
}
