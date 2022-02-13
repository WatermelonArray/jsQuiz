"use strict";

// Functions
const setText = (context) => {
	context.globalAlpha = 1;
	context.font = "64px Noto Sans";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
}

// Animation rendering
const background = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "rgb(238, 238, 238)";
	context.fillRect(0, 0, cw, ch);

}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];

	context.globalAlpha = 0.75;

	// left
	context.fillStyle = "#FF0000";
	if (callback.state.responsive) {
		context.fillRect(
			0,
			0,
			cw / 6,
			cw / 6
		)
	}
	else {
		context.fillRect(
			0,
			0,
			ch / 6,
			ch / 6
		)
	}

	// right
	context.fillStyle = "#FF00FF";
	if (callback.state.responsive) {
		context.fillRect(
			cw - (cw / 6),
			0,
			cw / 6,
			cw / 6
		)
	}
	else {
		context.fillRect(
			cw - (ch / 6),
			0,
			ch / 6,
			ch / 6
		)
	}

	// back
	context.fillStyle = "#00FF00";
	context.fillRect(
		cw / 6 * 2,
		ch / 12 * 10,
		cw / 6 * 2,
		ch / 12
	)

	setText(context)

	if (callback.state.responsive) {
		context.fillText("<", cw / 12, cw / 12);
		context.fillText(">", cw - (cw / 12), cw / 12);
	}
	else {
		context.fillText("<", ch / 12, ch / 12);
		context.fillText(">", cw - (ch / 12), ch / 12);
	}

	context.fillText("Back", cw / 2, ch / 12 * 10.5);

	buttonLocations.push({
		loc: {
			x0: cw / 6 * 2,
			x1: (cw / 6 * 2) + (cw / 6 * 2),
			y0: ch / 12 * 10,
			y1: (ch / 12 * 10) + (ch / 12)
		},
		ref: "confirm"
	})
	callback.state.buttons = buttonLocations;

}

const mainText = (context, callback, cw, ch) => {
	
	context.globalAlpha = 1;
	context.font = "64px Noto Sans Light";
	context.fillStyle = "rgb(33, 37, 41)";
	context.textAlign = "center";
	context.textBaseline = "middle"

	if (callback.state.responsive) {
		context.fillText("Help", cw / 2, ch / 12 * 1.5);
	}
	else {
		context.fillText("Help", cw / 2, ch / 12);
	}

}

// Method
const helpAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	buttons(context, callback, cw, ch);
	mainText(context, callback, cw, ch);

}

// Export
export {helpAnimation};