$(document).ready(function()
{
	var c1 = document.getElementById("canvas1");
	var c2 = document.getElementById("canvas2");
	var ctx1 = c1.getContext("2d");
	var ctx2 = c2.getContext("2d");
	var width = c1.width = c2.width = 37;
	var height = c1.height = c2.height = 37;
	drawHandball(width, height, ctx1, 10);
	drawHandball(width, height, ctx2, -10);
});


function drawHandball(width, height, context, xOffset)
{
	var centerX = width / 2;
	var centerY = height / 2;
	var innerRadius = 1;
	var outerRadius = 18;
	var radius = 18;
	var gradient = context.createRadialGradient(centerX + xOffset, centerY, innerRadius, centerX, centerY, outerRadius);
	gradient.addColorStop(0, "white");
	gradient.addColorStop(1, "blue");
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
}