"use strict";

let time = 0;

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

const mainText = (context, callback, cw, ch) => {
	let options = {
		font: "light",
		color: "white",
		size: 1,
		text: "JavaScript Quiz Game"
	}
	if (time > 60) {
		callback.setText(context, cw / 6 * 5, options)
		context.fillText("JavaScript Quiz Game",
			callback.lerp(1/(time - 60), cw/2, 0),
			ch / 2
		);
	}
}

let flash = 0
const text = (context, callback, cw, ch) => {
	let options = {
		font: "mono",
		color: "white",
		size: 4,
		text: "Pres Start To Play"
	}
	if (time > 180) {
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

	const cw = canvas.width;
	const ch = canvas.height;

	time++;

	background(context, cw, ch);
	bar(context, callback, cw, ch);
	mainText(context, callback, cw, ch);
	text(context, callback, cw, ch);

}

// Export
export {titleAnimation};