"use strict";

function menuText(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	// menu title
	context.globalAlpha = 1;
	context.font = "64px Helvetica";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.fillText("JavaScript Quiz Game", cw/2, ch/2);
}

let flash = 1
function startText(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	flash++

	if (flash > 30 && flash < 60) {
		context.globalAlpha = 1;
		context.font = "32px Courier";
		context.fillStyle = "#FFFFFF";
		context.textAlign = "center";
		context.fillText("Press Start To Play", cw/2, (ch/4) * 3);
	}
	else if(flash > 60){
		flash = 0
	}
}

export {menuText, startText}