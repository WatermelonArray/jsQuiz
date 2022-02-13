"use strict";

const background = (context, callback, cw, ch) => {

	//console.log(callback.state.answerResponse)

	if (callback.state.answerResponse == 2) {context.fillStyle = "#6e9632";}
	if (callback.state.answerResponse == 1 || callback.state.answerResponse == 0) {context.fillStyle = "#963331";}

	context.globalAlpha = 1;
	context.fillRect(0, 0, cw, ch);

}

const buttons = (context, callback, cw, ch) => {
	
	let buttonLocations = [];

	let options = {
		font: "light",
		color: "mono",
		size: 1
	}

	context.shadowBlur = "16";
	
	context.shadowColor = "rgba(0, 0, 0, 0.4)";

	context.fillStyle = "#222222";

	if (callback.state.answerResponse == 1 | callback.state.answerResponse == 0) {context.fillStyle = "#eeeeee";}

	
	
	context.shadowBlur = "0";

	if (callback.state.answerResponse == 1 | callback.state.answerResponse == 0) {options.color = "dark";}
	else {options.color = "white";}

	if (callback.state.finish) {

		context.fillRect(
			cw / 6 * 2.5,
			ch / 6 * 5,
			cw / 6,
			ch / 6 * 0.5
		);

		options.text = "Finish Quiz";
		callback.setText(context, cw / 6, options);
		context.fillText(
			"Finish Quiz",
			cw / 2,
			ch / 12 * 10.5
		);

		buttonLocations.push({
			loc: {
				x0: cw / 6 * 2.5,
				x1: (cw / 6 * 2.5) + (cw / 6),
				y0: ch / 6 * 5,
				y1: (ch / 6 * 5) + (ch / 6 * 0.5)
			},
			ref: "nextQuestion"
		})
	}
	else {

		context.fillRect(
			cw / 6,
			ch / 6 * 5,
			cw / 6 * 1.5,
			ch / 6 * 0.5
		);

		context.fillRect(
			cw / 6 * 3.5,
			ch / 6 * 5,
			cw / 6 * 1.5,
			ch / 6 * 0.5
		);

		callback.setText(context, cw / 6, options);
		context.fillText(
		"Main Menu",
			cw / 12 * 3.5,
			ch / 12 * 10.5
		);
		context.fillText(
			"Next Question",
			cw / 12 * 8.5,
			ch / 12 * 10.5
		);

		buttonLocations.push({
			loc: {
				x0: cw / 6,
				x1: (cw / 6) + (cw / 6 * 1.5),
				y0: ch / 6 * 5,
				y1: (ch / 6 * 5) + (ch / 6 * 0.5)
			},
			ref: "menu"
		});
		buttonLocations.push({
			loc: {
				x0: cw / 6 * 3.5,
				x1: (cw / 6 * 3.5) + (cw / 6 * 1.5),
				y0: ch / 6 * 5,
				y1: (ch / 6 * 5) + (ch / 6 * 0.5)
			},
			ref: "nextQuestion"
		})
	}

	callback.state.buttons = buttonLocations;
}

const text = (context, callback, cw, ch) => {

	let options = {
		text: "Wrong Answer",
		color: "white",
		font: "light",
		size: 2
	}

	callback.setText(context, cw, options);

	if (callback.state.answerResponse == 1 || callback.state.answerResponse == 0) {

		options.size = 3;
		options.text = "You chose:"
		callback.setText(context, cw, options);
		context.fillText("You chose: ", cw / 2, ch / 6 * 2);

		options.size = 2;
		options.text = callback.state.answerText;
		options.font = "normal";
		callback.setText(context, cw, options);
		context.fillText(callback.state.answerText, cw / 2, ch / 6 * 2.5);

		options.size = 3;
		options.text = "Correct answer:"
		callback.setText(context, cw, options);
		context.fillText("Correct answer: ", cw / 2, ch / 6 * 3.5);

		options.size = 2;
		options.text = callback.state.correctAnswer;
		options.font = "normal";
		callback.setText(context, cw, options);
		context.fillText(callback.state.correctAnswer, cw / 2, ch / 6 * 4);

	}

	else {
		context.fillText("Well done!", cw / 2, ch / 2);
	}

}

const titleText = (context, callback, cw, ch) => {

	let options = {
		text: "Wrong Answer",
		color: "white",
		font: "light",
		size: 1
	}
	
	callback.setText(context, cw, options);
	if (callback.state.answerResponse == 1 || callback.state.answerResponse == 0) {context.fillText("Wrong Answer", cw / 2, ch / 12 * 1.5);}
	else {context.fillText("Right Answer", cw / 2, ch / 12 * 1.5);}

}

const answerAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, callback, cw, ch);
	text(context, callback, cw, ch);
	buttons(context, callback, cw, ch);
	titleText(context, callback, cw, ch);
}

export {answerAnimation};