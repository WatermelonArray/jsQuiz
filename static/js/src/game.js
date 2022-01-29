"use strict";

// Functions
let setColor = () => {return "hsl(" + Math.floor((Math.random() * 360) + 1) + ",30%,50%)"}
let setButtonColor = () => {return "hsl(" + Math.floor((Math.random() * 360) + 1) + ",80%,50%)"}

const setButtonColorPreset = () => {
	const colorPreset = Math.floor((Math.random() * 3) + 1);

	if (colorPreset == 1) {
		return "rgb(255, 0, 0)";
	}
	if (colorPreset == 2) {
		return "rgb(0, 255, 0)";
	}
	if (colorPreset == 3) {
		return "rgb(0, 0, 255)";
	}
}


const setText = (context) => {
	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
}

// Variables
let currentColor = setColor();
let currentQuiz = {};

let questionTitle = "$QUESTION TITLE";
let questions = [];

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

		context.fillStyle = questions[i][1];
		context.globalAlpha = 1;
		context.fillRect(
			cw / 6 * 1,
			(ch / 6 * 1.5) + (totalY / questions.length * i),
			cw / 6 * 4,
			ch / 6 * ((4 / questions.length) * 0.8)
		)
		setText(context)
		context.fillText(
			questions[i][0],
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
	context.fillText(questionTitle, cw / 2, ch / 12);

}

const setQuiz = (quiz) => {

	currentColor = setColor();

	currentQuiz = quiz;

	questionTitle = quiz.questions["1"].question;

	let a = [];
	for (let i = 0; i < Object.keys(quiz.questions["1"].answers).length; i++) {
		a.push([quiz.questions["1"].answers[i].description, setButtonColorPreset()]);
	}

	questions = a;

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