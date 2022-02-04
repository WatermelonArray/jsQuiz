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

}

const mainText = (context, callback, cw, ch) => {
	
	context.globalAlpha = 1;
	context.font = "64px Noto Sans Light";
	context.fillStyle = "rgb(33, 37, 41)";
	context.textAlign = "center";
	context.textBaseline = "middle"

	if (callback.state.responsive) {
		context.fillText("Quiz Editor", cw / 2, ch / 12 * 1.5);
	}
	else {
		context.fillText("Quiz Editor", cw / 2, ch / 12);
	}

}

// Method
function editorAnimation(canvas, context, callback) {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	//buttons(context, callback, cw, ch);
	mainText(context, callback, cw, ch);

}

// Export
export {editorAnimation};