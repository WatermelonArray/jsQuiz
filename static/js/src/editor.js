"use strict";

// Animation rendering
const background = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "rgb(238, 238, 238)";
	context.fillRect(0, 0, cw, ch);

	let options = {
		font: "normal",
		color: "dark",
		size: 5,
		text: "babasmasmoosic - Turtle's Adventures: The Begininng",
		align: "right"
	};
	callback.setText(context, cw / 2, options);
	context.fillText(options.text, cw / 24 * 23, ch - (ch / 24));
}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];
	let options = {
		font: "mono",
		color: "white",
		size: 3,
		text: "Back"
	}

	context.fillStyle = "#222222";
	context.fillRect(
		0,
		ch - (ch / 12),
		cw / 6,
		ch / 12
	)
	context.fillRect(
		cw - (ch / 12 * 2),
		0,
		ch / 12 * 2,
		ch / 12
	)

	callback.setText(context, cw / 6 * 0.8, options);
	context.fillText("Back", cw / 12, ch - (ch / 24));
	callback.setText(context, cw / 12, options);
	context.fillText("Help", cw - (ch / 12), ch / 24);

	buttonLocations.push({
		loc: {
			x0: 0,
			x1: (cw / 6),
			y0: ch - (ch / 12),
			y1: ch
		},
		ref: "confirm"
	});
	buttonLocations.push({
		loc: {
			x0: cw - (ch / 12 * 2),
			x1: cw,
			y0: 0,
			y1: ch / 12
		},
		ref: "help"
	})

	callback.state.buttons = buttonLocations;

}

const mainText = (context, callback, cw, ch) => {
	
	context.globalAlpha = 1;
	let questionLength = 0;
	//try {questionLength = Object.keys(callback.state.editorQuiz.questions).length;}
	//finally {console.log("good")}

	let options = {
		font: "light",
		color: "dark",
		size: 2,
		text: "Quiz Editor"
	}

	callback.setText(context, cw / 4 * 3, options);

	if (callback.state.responsive) {
		context.fillText("Quiz Editor", cw / 2, ch / 12 * 1.5);
		//context.fillText("Question " + callback.state.editorQuestion + " of " + callback.state.editorQuiz.questions)
	}
	else {
		context.fillText("Quiz Editor", cw / 2, ch / 12);
	}

	context.fillText("Work in Progress", cw / 2, ch / 2);

}

// Method
const editorAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, callback, cw, ch);
	buttons(context, callback, cw, ch);
	mainText(context, callback, cw, ch);

}

// Export
export {editorAnimation};