"use strict";

function background(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	context.globalAlpha = 1;
	context.fillStyle = "#619BB8";
	context.fillRect(0, 0, cw, ch);

}

let barSize = -60;		// negative means frames AFTER start of renderer
let c_barSize = 0;
function bar(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	context.fillStyle = "#000000";
	context.globalAlpha = 0.75;
	context.rotate(0.5)
	context.fillRect(
		0,//(cw / 3) * 2, 
		ch/2,
		cw*2,
		200
	);
}

function startText(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;
	
	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle"
	context.fillText("Level Select", cw/3 * 2, 0);
	context.rotate(-0.5)
}

function tempText(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;
	
	context.globalAlpha = 1;
	context.font = "normal normal 900 64px Sans";
	context.fillStyle = "#B86161";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("wip", cw/2, ch/2);

}

function levelSelectAnimation(canvas, context) {
	background(canvas, context);
	bar(canvas, context);
	startText(canvas, context);
	tempText(canvas, context);

}
export {levelSelectAnimation};