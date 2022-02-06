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

const checkLength = (width, cw) => {
	return width < (cw / 12 * 10)
}

// Variables
let currentColor = setColor();
let currentQuiz = {};

let questions = [];

// Animation rendering
const background = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "#eeeeee";
	context.fillRect(0, 0, cw, ch);

}

const buttons = (context, callback, cw, ch) => {

	const totalY = ch / 6 * 4
	let buttonLocations = [];

	let options = {
		font: "light",
		color: "mono",
		size: 1
	}

	let presetMode = 0; // 0 - column, 1 - side by side (2 questions), 2 - quad (4 questions)

	let textLength = "";
	for (let i = 0; i < questions.length; i++) {
		if (questions[i][0].length > textLength.length) {textLength = questions[i][0];}
	}
	options.text = textLength;

	// questions
	for (let i = 0; i < questions.length; i++){

		context.shadowBlur = "16";
		context.shadowColor = "rgba(0, 0, 0, 0.4)";
		context.fillStyle = "#444444"


		if (callback.state.responsive) {
			context.fillRect(
				cw / 6,
				(ch / 6 * 1.5) + (totalY / questions.length * i),
				cw / 6 * 4,
				ch / 6 * ((4 / questions.length) * 0.8)
			)
		}
		else {
			context.fillRect(
				cw / 6,
				(ch / 6 * 1.5) + (totalY / questions.length * i),
				cw / 6 * 4,
				ch / 6 * ((4 / questions.length) * 0.8)
			)
		}

		context.shadowBlur = 0;
		callback.setText(context, cw / 6 * 4, options)
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

	const questionText = callback.state.quiz.questions[callback.state.questionNumber].question

	let options = {
		text: questionText,
		color: "dark",
		font: "normal",
		size: 1,
		get: false
	}
	
	callback.setText(context, cw, options);

	context.fillText(questionText, cw / 2, ch / 12 * 1.5);

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