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

let questions = [];

// Animation rendering
const background = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = currentColor;
	context.fillRect(0, 0, cw, ch);

}

const buttons = (context, callback, cw, ch) => {

	const totalY = ch / 6 * 4
	let buttonLocations = [];

	let presetMode = 0; // 0 - column, 1 - side by side (2 questions), 2 - quad (6 questions), 3 
	// questions
	for (let i = 0; i < questions.length; i++){

		context.fillStyle = questions[i][1];
		context.globalAlpha = 1;
		context.fillRect(
			cw / 6,
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

		buttonLocations.push({
			loc: {
				x0: cw / 6,
				x1: (cw / 6) + (cw / 6 * 4),
				y0: (ch / 6 * 1.5) + (totalY / questions.length * i),
				y1: ((ch / 6 * 1.5) + (totalY / questions.length * i)) + (ch / 6 * ((4 / questions.length) * 0.8))
			},
			ref: questions[i]
		})
	}

	callback.state.quizButtons = buttonLocations;
}

const titleText = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	context.font = "64px Courier";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(callback.state.quiz.questions[callback.state.questionNumber].question, cw / 2, ch / 12);

}

const setQuiz = (callback) => {

	currentColor = setColor();

	let a = [];
	for (let i = 0; i < Object.keys(callback.state.quiz.questions[callback.state.questionNumber].answers).length; i++) {
		a.push([callback.state.quiz.questions[callback.state.questionNumber].answers[i].description, setButtonColorPreset()]);
	}
	questions = a;

}

// Method
const gameAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	buttons(context, callback, cw, ch);
	titleText(context, callback, cw, ch);

}

// Export
export {gameAnimation, setQuiz};