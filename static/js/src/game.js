"use strict";

// Functions
let setButtonColor = (x) => {
	let color = "#222222";
	if (x == "answer") {color = "#bb0000";}
	else if (x == "wrong") {color = "#00bb00";}
	return color;
}

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
	for (let i = 0; i < callback.state.answerList.length; i++) {
		if (callback.state.answerList[i].length > textLength.length) {textLength = callback.state.answerList[i];}
	}
	options.text = textLength;

	// questions
	for (let i = 0; i < callback.state.answerList.length; i++){

		context.shadowBlur = "16";
		context.shadowColor = "rgba(0, 0, 0, 0.4)";
		context.fillStyle = "#444444"

		if (callback.state.responsive) {
			context.fillRect(
				cw / 6,
				(ch / 6 * 1.5) + (totalY / callback.state.answerList.length * i),
				cw / 6 * 4,
				ch / 6 * ((4 / callback.state.answerList.length) * 0.8)
			)
		}
		else {
			context.fillRect(
				cw / 6,
				(ch / 6 * 1.5) + (totalY / callback.state.answerList.length * i),
				cw / 6 * 4,
				ch / 6 * ((4 / callback.state.answerList.length) * 0.8)
			)
		}

		context.shadowBlur = 0;
		callback.setText(context, cw / 6 * 4, options)
		context.fillText(
			callback.state.answerList[i],
			cw / 2,
			(ch / 6 * 1.5) + (totalY / callback.state.answerList.length * i) + (ch / 6 * ((4 / callback.state.answerList.length) * 0.8) / 2)
		)

		buttonLocations.push({
			loc: {
				x0: cw / 6,
				x1: (cw / 6) + (cw / 6 * 4),
				y0: (ch / 6 * 1.5) + (totalY / callback.state.answerList.length * i),
				y1: ((ch / 6 * 1.5) + (totalY / callback.state.answerList.length * i)) + (ch / 6 * ((4 / callback.state.answerList.length) * 0.8))
			},
			ref: callback.state.answerList[i]
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

// Method
const gameAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	buttons(context, callback, cw, ch);
	titleText(context, callback, cw, ch);

}

// Export
export {gameAnimation};