"use strict";

// Variables
let time = 0;
let delay = 60;
let flash = 0;

// Animation rendering
let hslColor = [0, 20, 50];
const background = (context, callback, cw, ch) => {

	hslColor[0] = hslColor[0] + 0.5;
	if (hslColor[0] > 359) {hslColor[0] = 0;}

	context.globalAlpha = 1;
	context.fillStyle = "hsl(" + hslColor[0] + "," + hslColor[1] + "%," + hslColor[2] + "%)";
	context.fillRect(0, 0, cw, ch);

	let options = {
		font: "normal",
		color: "white",
		size: 5,
		text: "babasmasmoosic - Space Journey",
		align: "right"
	};

	callback.setText(context, cw / 2, options);
	context.fillText(options.text, cw / 24 * 23, ch / 24 * 23);

}

const bar = (context, callback, cw, ch) => {
	if (time > delay) {
		context.fillStyle = "#000000";
		context.globalAlpha = 0.75;
		context.fillRect(
			0,
			(ch / 2) - 100,
			callback.lerp(
				2 / (time - delay),
				cw + 100,
				0
			),
			200
		);
	}
}

const mainText = (context, callback, cw, ch) => {

	let options = {
		font: "light",
		color: "white",
		size: 1,
		text: "JavaScript Quiz Game"
	};

	if (time > 60 + delay) {
		callback.setText(context, cw / 6 * 5, options)
		context.fillText("JavaScript Quiz Game",
			callback.lerp(
				1 / ((time - delay) - 60),
				cw / 2,
				0
			),
			ch / 2
		);
	}
}

const text = (context, callback, cw, ch) => {
	let options = {
		font: "mono",
		color: "white",
		size: 4,
		text: "Pres Start To Play"
	};
	if (time > 180 + delay) {
		flash++;
		if (flash < 30) {
			callback.setText(context, cw / 6 * 4, options)
			context.fillText("Press Start To Play",
				cw / 2,
				(ch / 2) + 200
			);
		}
		else if(flash > 60){
			flash = 0;
		}
	}
}

// Method
const titleAnimation = (canvas, context, callback) => {

	// reset
	if (callback.resetFuncs.title === undefined) {callback.resetFuncs.title = function() {time = 0; flash = 0;}}
	
	time++;
	const cw = canvas.width;
	const ch = canvas.height;

	background(context, callback, cw, ch);
	bar(context, callback, cw, ch);
	mainText(context, callback, cw, ch);
	text(context, callback, cw, ch);
}

// Export
export {titleAnimation};