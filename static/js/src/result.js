"use strict";

// Animation rendering
const background = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "#6e9632";

	context.fillRect(0, 0, cw, ch);

}

const resultText = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	const questionLength = Object.keys(callback.state.quiz.questions).length

	let options = {
		font: "subtitle",
		color: "white",
		size: 3,
		text: "You got"
	};

	callback.setText(context, cw / 2, options);
	context.fillText("You got", cw / 2, ch / 6 * 2.5)
	
	options.size = 2;
	options.text = callback.state.score;
	callback.setText(context, cw / 2, options);
	context.fillText(callback.state.score, cw / 2, ch / 2)
	
	options.text = "Correct questions out of " + questionLength;
	options.size = 3;
	callback.setText(context, cw / 2, options);
	context.fillText("Correct questions out of " + questionLength, cw / 2, ch / 6 * 3.5);

}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];

	context.globalAlpha = 1;
	context.shadowBlur = "16";
	context.shadowColor = "rgba(0, 0, 0, 0.4)";

	context.fillStyle = "#222222";
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

	context.shadowBlur = "0";

	let options = {
		font: "subtitle",
		color: "white",
		size: 4,
		text: "Main Menu"
	};

	callback.setText(context, cw / 6 * 1.8, options)
	context.fillText("Main Menu",
		cw / 6 * 1.9,
		ch / 6 * 5
	);

	options.text = "Restart Quiz";
	callback.setText(context, cw / 6 * 1.8, options)
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
		ref: "nextQuestion"
	})
	callback.state.buttons = buttonLocations;
}

const title = (context, callback, cw, ch) => {

	context.globalAlpha = 1;

	let options = {
		font: "subtitle",
		color: "white",
		size: 2,
		text: "Results"
	};

	callback.setText(context, cw / 2, options);
	context.fillText("Results", cw / 2, ch / 6);

}

// Method
const resultAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, callback, cw, ch);
	title(context, callback, cw, ch);
	resultText(context, callback, cw, ch)
	buttons(context, callback, cw, ch)

}

export {resultAnimation};