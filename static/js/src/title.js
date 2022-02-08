"use strict";

// Animation rendering
let hslColor = [0, 20, 50];
const background = (context, cw, ch) => {

	hslColor[0] = hslColor[0] + 0.5;

	if (hslColor[0] > 359) {hslColor[0] = 0;}

	context.globalAlpha = 1;
	context.fillStyle = "hsl(" + hslColor[0] + "," + hslColor[1] + "%," + hslColor[2] + "%)";
	context.fillRect(0, 0, cw, ch);

}

const bar = (context, callback, cw, ch) => {

	context.fillStyle = "#000000";
	context.globalAlpha = 0.75;
	context.fillRect(
		0,
		(ch / 2) - 100,
		callback.lerp(2/time, cw, 0) + 100,
		200
	);

}

let textLoc = -90;
let c_textLoc = 0;
const mainText = (context, cw, ch) => {

	if (textLoc < 16 && textLoc > 0) {
		textLoc++;
		c_textLoc = textLoc;
	}
	if (textLoc <= 0) {
		textLoc++;
	}

	// menu title
	context.globalAlpha = 1;
	context.font = "72px Noto Sans Light";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("JavaScript Quiz Game",
		-cw/2 + ((cw/16) * c_textLoc),
		ch / 2
	);
}

let flash =0
const text = (context, cw, ch) => {

	flash++;

	if (textLoc >= 16) {
		if (flash < 30) {
			context.globalAlpha = 1;
			context.font = "32px Liberation Mono";
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

// Method
let time = 0;
const titleAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	time++;
	bar(context, callback, cw, ch);
	mainText(context, cw, ch);
	text(context, cw, ch);
	
	
}

// Export
export {titleAnimation};