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
	};
	callback.setText(context, cw / 4, options);
	context.fillText(options.text, cw / 2, ch - (ch / 48));

}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];
	let options = {
		font: "mono",
		color: "white",
		size: 3,
		text: "Back"
	};

	context.fillStyle = "#222222";

	// bottomLeft
	context.fillRect(
		0,
		ch - (ch / 12),
		ch / 12 * 1.5,
		ch / 12
	);
	context.fillRect(
		0,
		ch - (ch / 12 * 2.2),
		ch / 12 * 1.5,
		ch / 12
	);
	context.fillRect(
		0,
		ch - (ch / 12 * 3.4),
		ch / 12 * 1.5,
		ch / 12
	);

	// help
	context.fillRect(
		cw - (ch / 12),
		0,
		ch / 12,
		ch / 12
	);

	// left-right question buttons
	context.fillRect(
		0,
		ch / 12 * 1.2,
		ch / 12,
		ch / 12
	);
	context.fillRect(
		cw - (ch / 12),
		ch / 12 * 1.2,
		ch / 12,
		ch / 12
	);

	// add-remove questions
	context.fillRect(
		0,
		ch / 12 * 2.4,
		ch / 12,
		ch / 12
	);
	context.fillRect(
		cw - (ch / 12),
		ch / 12 * 2.4,
		ch / 12,
		ch / 12
	);

	// change name
	context.fillRect(
		cw / 12 * 4,
		ch / 12 * 2.4,
		cw / 12 * 4,
		ch / 12
	);

	// add answer
	context.fillRect(
		cw - (ch / 12 * 1.5),
		ch / 12 * 11,
		ch / 12 * 1.5,
		ch / 12
	);

	options.text = "+";
	options.size = 2;
	callback.setText(context, ch / 12, options);
	context.fillText("<", ch / 24, ch / 12 * 1.7);
	context.fillText(">", cw - (ch / 24), ch / 12 * 1.7);
	context.fillText("-", ch / 24, ch / 12 * 2.9);
	context.fillText("+", cw - (ch / 24), ch / 12 * 2.9);

	options.text = "Add Answer";
	callback.setText(context, ch / 12 * 1.5, options);
	context.fillText("Add Answer", cw - (ch / 12 * 0.75), ch - (ch / 24));

	options.text = "Change Quiz Name"
	callback.setText(context, cw / 12 * 3.8, options)
	context.fillText("Change Quiz Name", cw / 2, ch / 12 * 2.9);

	options.size = 3;
	options.text = "Back";
	callback.setText(context, ch / 12, options);
	context.fillText("Back", ch / 24 * 1.5, ch - (ch / 24));
	callback.setText(context, ch / 12 * 0.8, options);
	context.fillText("Help", cw - (ch / 24), ch / 24);

	options.text = "Import";
	callback.setText(context, ch / 12, options);
	context.fillText("Import", ch / 24 * 1.5, ch - (ch / 24 * 3.4));
	context.fillText("Export", ch / 24 * 1.5, ch - (ch / 24 * 5.8));

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
	});

	buttonLocations.push({
		loc: {
			x0: 0,
			x1: ch / 12,
			y0: ch / 12 * 1.2,
			y1: (ch / 12 * 1.2) + ch / 12
		},
		ref: "e_changeQuestionLeft"
	});
	buttonLocations.push({
		loc: {
			x0: cw - (ch / 12),
			x1: cw,
			y0: ch / 12 * 1.2,
			y1: (ch / 12 * 1.2) + ch / 12
		},
		ref: "e_changeQuestionRight"
	});

	buttonLocations.push({
		loc: {
			x0: cw - (ch / 12 * 1.5),
			x1: cw,
			y0: ch / 12 * 11,
			y1: (ch / 12 * 11) + ch / 12
		},
		ref: "e_addAnswer"
	});

	buttonLocations.push({
		loc: {
			x0: cw - (ch / 12),
			x1: cw,
			y0: ch / 12 * 2.4,
			y1: (ch / 12 * 2.4) + ch / 12
		},
		ref: "e_addQuestion"
	});
	buttonLocations.push({
		loc: {
			x0: 0,
			x1: ch / 12,
			y0: ch / 12 * 2.4,
			y1: (ch / 12 * 2.4) + ch / 12
		},
		ref: "e_removeQuestion"
	});

	callback.state.buttons = buttonLocations;

}

const mainText = (context, callback, cw, ch) => {
	
	context.globalAlpha = 1;

	let options = {
		font: "light",
		color: "dark",
		size: 3,
		text: "Quiz Editor"
	};

	callback.setText(context, cw / 4 * 3, options);
	context.fillText("Quiz Editor", cw / 2, ch / 24);
	//context.fillText("Work in Progress", cw / 2, ch / 2);

	options.text = callback.editor.quizName;
	callback.setText(context, cw - (ch / 12 * 4), options);
	context.fillText(options.text, cw / 2, ch / 12 * 3.8);
	
	options.text = "Question " + callback.editor.currentQuestion + "/" + callback.editor.questionList.length;
	options.font = "mono";
	callback.setText(context, cw - (ch / 12 * 2), options);
	context.fillText(options.text, cw / 2, ch / 12 * 1.7);

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