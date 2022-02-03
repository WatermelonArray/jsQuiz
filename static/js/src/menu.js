"use strict";

// Functions
const setText = (context) => {
	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
}

// Animation rendering
const background = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "#619BB8";
	context.fillRect(0, 0, cw, ch);

}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];

	// quizes
	context.fillStyle = "#FF0000";
	context.globalAlpha = 0.75;
	context.fillRect(
		cw / 12 * 2,
		ch / 12 * 2,
		cw / 12 * 3.75,
		ch / 12 * 5
	)
	setText(context)
	context.fillText("Quizes", cw / 12 * 3.875, ch / 12 * 4.5);

	// custom
	context.fillStyle = "#00FF00";
	context.globalAlpha = 0.75;
	context.fillRect(
		cw / 12 * 6.25,
		ch / 12 * 2,
		cw / 12 * 3.75,
		ch / 12 * 5
	)
	setText(context)
	context.fillText("Custom", cw / 12 * 8.125, ch / 12 * 4.5);

	// help
	context.fillStyle = "#0000FF";
	context.globalAlpha = 0.75;
	context.fillRect(
		cw / 12 * 2,
		ch / 12 * 7.5,
		cw / 12 * 8,
		ch / 12 * 2.5
	)
	setText(context)
	context.fillText("Help", cw / 2, ch / 12 * 8.75);

	buttonLocations.push({
		loc: {
			x0: cw / 12 * 2,
			x1: (cw / 12 * 2) + (cw / 12 * 3.75),
			y0: (ch / 12 * 2),
			y1: (ch / 12 * 2) + (ch / 12 * 5)
		},
		ref: "game"
	})

	callback.state.buttons = buttonLocations;

}

const mainText = (context, cw, ch) => {
	
	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle"
	context.fillText("Main Menu", cw / 2, ch / 12);

}

// Method
function menuAnimation(canvas, context, callback) {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	buttons(context, callback, cw, ch);
	mainText(context, cw, ch);

}

// Export
export {menuAnimation};