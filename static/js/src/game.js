"use strict";

// Functions
let setColor = () => {return "hsl(" + Math.floor((Math.random() * 360) + 1) + ",30%,50%)"}

const setText = (context) => {
	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
}

// Variables
let currentColor = setColor();
let questions = [1, 2, 3, 4];

// Animation rendering
const background = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = currentColor;
	context.fillRect(0, 0, cw, ch);

}

const buttons = (context, cw, ch) => {

	const totalY = ch / 6 * 4

		// questions
	for (let i = 0; i < questions.length; i++){

		context.fillStyle = "#FF0000";
		context.globalAlpha = 0.75;
		context.fillRect(
			cw / 6 * 1,
			(ch / 6 * 1.5) + (totalY / questions.length * i),
			cw / 6 * 4,
			ch / 6 * ((4 / questions.length) * 0.8)
		)
		setText(context)
		context.fillText(
			questions[i],
			cw / 2,
			(ch / 6 * 1.5) + (totalY / questions.length * i) + (ch / 6 * ((4 / questions.length) * 0.8) / 2)
		)
	}
}

const titleText = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("$QESTION TITLE", cw / 2, ch / 12);

}

const setQuiz = (quiz) => {

	currentColor = setColor();
	questions = quiz;

}

// Method
function gameAnimation(canvas, context) {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	buttons(context, cw, ch);
	titleText(context, cw, ch);

}

// Export
export {gameAnimation, setQuiz};