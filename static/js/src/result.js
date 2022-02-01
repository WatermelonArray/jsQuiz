"use strict";


const background = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	if (callback.state.answerResponse == 1) {
		context.fillStyle = "#FF0000";
	}
	else if (callback.state.answerResponse == 2) {
		context.fillStyle = "#00FF00";
	}
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

	context.fillStyle = "#444444";
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
	context.fillStyle = "#FFFFFF";
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

}

const title = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("Results", cw / 2, ch / 6);

}
const resultAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, callback, cw, ch);
	title(context, cw, ch);
	resultText(context, callback, cw, ch)
	buttons(context, callback, cw, ch)

}

export {resultAnimation};