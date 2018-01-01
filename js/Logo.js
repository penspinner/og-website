$(document).ready(function() 
{
	var canvas = document.getElementById("canvas");
	var canvas2D = canvas.getContext("2d");
	var width = canvas.width = window.innerWidth / 2;
	var height = canvas.height = window.innerHeight / 2;
	canvas2D.strokeStyle = "#28DC18";
	canvas2D.fillStyle = "transparent";
	canvas2D.lineWidth = 5;

	// Sets origin at the middle of the canvas
	var transX = width * 0.5;
	var transY = height * 0.5;
	canvas2D.translate(transX, transY);

	var logo = new Logo();
	logo.initVertices();
	render();

	function getMousePos(canvas, event) 
	{
			var rect = canvas.getBoundingClientRect();
			return {
					x: event.clientX - rect.left - transX,
					y: event.clientY - rect.top - transY
			};
	}
	
	function render() 
	{
		canvas2D.clearRect(-transX, -transY, width, height);
  	canvas2D.fillRect(-transX, -transY, width, height);
  	logo.display(canvas2D, 100);
  	rotateX(logo, 0.01);
  	rotateY(logo, 0.01);
// 		rotateZ(logo, 0.01);
  	requestAnimationFrame(render);
	}
});

function Logo() 
{
	this.vertices = [];
	this.initVertices = function() 
	{
		var v0 = new Vertex(-125, -125, -125);
		var v1 = new Vertex(-125, 125, -125);
		var v2 = new Vertex(125, 125, -125);
		var v3 = new Vertex(125, -125,-125);
		var v4 = new Vertex(-125, -125, 125);
		var v5 = new Vertex(-125, 125, 125);
		var v6 = new Vertex(125, 125, 125);
		var v7 = new Vertex(125, -125,125);

		this.vertices.push(v0);
		this.vertices.push(v1);
		this.vertices.push(v2);
		this.vertices.push(v3);
		this.vertices.push(v4);
		this.vertices.push(v5);
		this.vertices.push(v6);
		this.vertices.push(v7);
	};
	this.display = function(canvas2D) 
	{
		var vertices = [];
		for (var i = 0; i < this.vertices.length; i++)
			vertices.push(this.vertices[i]);

		canvas2D.beginPath();
		// Draw the front square
		canvas2D.moveTo(vertices[0].x, vertices[0].y);
		canvas2D.lineTo(vertices[1].x, vertices[1].y);
		canvas2D.lineTo(vertices[2].x, vertices[2].y);
		canvas2D.lineTo(vertices[3].x, vertices[3].y);
		canvas2D.lineTo(vertices[0].x, vertices[0].y);
		// Draw the back square
		canvas2D.moveTo(vertices[4].x, vertices[4].y);
		canvas2D.lineTo(vertices[5].x, vertices[5].y);
		canvas2D.lineTo(vertices[6].x, vertices[6].y);
		canvas2D.lineTo(vertices[7].x, vertices[7].y);
		canvas2D.lineTo(vertices[4].x, vertices[4].y);
		// Draw the lines to connect the square to form a cube
		canvas2D.moveTo(vertices[0].x, vertices[0].y);
		canvas2D.lineTo(vertices[4].x, vertices[4].y);
		canvas2D.moveTo(vertices[1].x, vertices[1].y);
		canvas2D.lineTo(vertices[5].x, vertices[5].y);
		canvas2D.moveTo(vertices[2].x, vertices[2].y);
		canvas2D.lineTo(vertices[6].x, vertices[6].y);
		canvas2D.moveTo(vertices[3].x, vertices[3].y);
		canvas2D.lineTo(vertices[7].x, vertices[7].y);
		
		canvas2D.stroke();
	};
}

function Vertex(x, y, z) 
{
	this.x = x;
	this.y = y;
	this.z = z;
}

function rotateX(logo, angle) 
{
	var cos = Math.cos(angle), sin = Math.sin(angle);
	var vertices = logo.vertices;

	for (var i = 0; i < vertices.length; i++) 
	{
		var v = vertices[i],
			y = v.y * cos - v.z * sin,
			z = v.z * cos + v.y * sin;
		v.y = y;
		v.z = z;
	}
}

function rotateY(logo, angle) 
{
	var cos = Math.cos(angle), sin = Math.sin(angle);
	var vertices = logo.vertices;

	for (var i = 0; i < vertices.length; i++) 
	{
		var v = vertices[i],
			x = v.x * cos - v.z * sin,
			z = v.z * cos + v.x * sin;
		v.x = x;
		v.z = z;
	}
}

function rotateZ(logo, angle) 
{
	var cos = Math.cos(angle), sin = Math.sin(angle);
	var vertices = logo.vertices;

	for (var i = 0; i < vertices.length; i++) 
	{
		var v = vertices[i],
			x = v.x * cos - v.y * sin,
			y = v.y * cos + v.x * sin;
		v.x = x;
		v.y = y;
	}
}
