"use strict";

// Animation rendering
const background = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "#6e9632";

	context.fillRect(0, 0, cw, ch);

}

const resultText = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	context.font = "32px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("You got", cw / 2, ch / 6 * 2.5)
	
	context.font = "64px Courier";
	context.fillText(callback.state.score, cw / 2, ch / 2)
	
	context.font = "32px Courier";
	context.fillText("Correct questions out of " + Object.keys(callback.state.quiz.questions).length, cw / 2, ch / 6 * 3.5);

}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];

	context.fillStyle = "#222222";
	context.globalAlpha = 1;
	context.fillRect(
		cw / 6,
		ch / 6 * 4.5,
		cw / 6 * 1.8,
		ch / 6
	)

	context.fillRect(
		cw / 6 * 3.2,
		ch / 6 * 4.5,
		cw / 6 * 1.8,
		ch / 6
	)

	context.globalAlpha = 1;
	context.font = "24px Courier";
	context.fillStyle = "rgb(200, 200, 200)";
	context.textAlign = "center";
	context.textBaseline = "middle";

	context.fillText("Main Menu",
		cw / 6 * 1.9,
		ch / 6 * 5
	);

	context.fillText("Restart Quiz",
		cw / 6 * 4.1,
		ch / 6 * 5
	);

	buttonLocations.push({
		loc: {
			x0: cw / 6,
			x1: (cw / 6) + (cw / 6 * 1.8),
			y0: (ch / 6 * 4.5),
			y1: (ch / 6 * 4.5) + (ch / 6)
		},
		ref: "menu"
	})

	buttonLocations.push({
		loc: {
			x0: cw / 6 * 3.2,
			x1: (cw / 6 * 3.2) + (cw / 6 * 1.8),
			y0: (ch / 6 * 4.5),
			y1: (ch / 6 * 4.5) + (ch / 6)
		},
		ref: "game"
	})
	callback.state.buttons = buttonLocations;
}

const title = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("Results", cw / 2, ch / 6);

}

// Method
const resultAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	title(context, cw, ch);
	resultText(context, callback, cw, ch)
	buttons(context, callback, cw, ch)

}

export {resultAnimation};