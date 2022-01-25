"use strict";

let hslColor = [0, 20, 50];
function menuBackground(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	hslColor[0] = hslColor[0] + 0.5;

	if (hslColor[0] > 359) {hslColor[0] = 0;}

	context.globalAlpha = 1;
	context.fillStyle = "hsl(" + hslColor[0] + "," + hslColor[1] + "%," + hslColor[2] + "%)";
	context.fillRect(0, 0, cw, ch);

}

let barSize = -60;		// negative means frames AFTER start of renderer
let c_barSize = 0;
function menuBar(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	if (barSize < 8 && barSize > 0) {
		barSize++;
		c_barSize = barSize;
	}
	if (barSize <= 0) {
		barSize++;
	}

	context.fillStyle = "#000000";
	context.globalAlpha = 0.75;
	context.fillRect(
		(cw / 2) - ((cw / 16) * c_barSize),
		(ch / 2) - 100,
		(cw / 8) * c_barSize,
		200
	);

}

let textLoc = -90;
let c_textLoc = 0;
function menuText(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	if (textLoc < 16 && textLoc > 0) {
		textLoc++;
		c_textLoc = textLoc;
	}
	if (textLoc <= 0) {
		textLoc++;
	}

	// menu title
	context.globalAlpha = 1;
	context.font = "64px Helvetica";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("JavaScript Quiz Game",
		-cw/2 + ((cw/16) * c_textLoc),
		ch / 2
	);


}

let flash = 1
function startText(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	flash++;

	if (textLoc >= 16) {
		if (flash > 30 && flash < 60) {
			context.globalAlpha = 1;
			context.font = "32px Courier";
			context.fillStyle = "#FFFFFF";
			context.textAlign = "center";
			context.textBaseline = "middle"
			context.fillText("Press Start To Play", cw/2, (ch/4) * 3);
		}
		else if(flash > 60){
			flash = 0;
		}
	}
}

function menuAnimation(canvas, context) {

	menuBackground(canvas, context);
	menuBar(canvas, context);
	menuText(canvas, context);
	startText(canvas, context);
}

export {menuAnimation};