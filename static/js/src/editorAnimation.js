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

const answerPopup = (context, callback, cw, ch) => {

	let buttonLocations = [];
	let options = {
		font: "mono",
		color: "white",
		size: 3,
		text: "Change Answer"
	}

	context.globalAlpha = 1;
	context.fillStyle = "#eeeeee";
	context.shadowBlur = "16";
	context.shadowColor = "rgba(0, 0, 0, 0.4)";
	
	if (callback.state.responsive) {context.fillRect(0, 0, cw, ch);}
	else {
		context.fillRect(
			ch / 12 * 1.8,
			ch / 12 * 2,
			cw - (ch / 12 * 3.6),
			ch - (ch / 12 * 4)
		);
	}
	context.shadowBlur = 0;

	context.fillStyle = "#222222"

	context.fillRect(
		cw / 12 * 2.2,
		ch / 12 * 6,
		cw / 12 * 7.6,
		ch / 12 * 1.5
	)
	context.fillRect(
		cw / 12 * 2.2,
		ch / 12 * 4,
		cw / 12 * 7.6,
		ch / 12 * 1.5
	)
	context.fillRect(
		cw / 12 * 4.5,
		ch / 12 * 8,
		cw / 12 * 3,
		ch / 12 * 1.5
	)

	callback.setText(context, ch / 12 * 7, options);
	context.fillText(
		"Change Answer",
		cw / 2,
		ch / 12 * 6.75
	);
	
	options.text = "Close"
	callback.setText(context, ch / 12 * 2.5, options);
	context.fillText(
		"Close",
		cw / 2,
		ch / 12 *8.75
	);

	if (callback.state.allowInput) {
		// text
		buttonLocations.push({
			loc: {
				x0: cw / 12 * 2.2,
				x1: (cw / 12 * 2.2) + (cw / 12 * 7.6),
				y0: ch / 12 * 6,
				y1: (ch / 12 * 6) + (ch / 12 * 1.5)
			},
			ref: "e_enterText"
		});

		buttonLocations.push({
			loc: {
				x0: cw / 12 * 4.5,
				x1: (cw / 12 * 4.5) + (cw / 12 * 3),
				y0: ch / 12 * 8,
				y1: (ch / 12 * 8) + (ch / 12 * 1.5)
			},
			ref: "e_closePopup"
		});

		// back
		callback.state.buttons = buttonLocations;
	}
}

const textboxPopup = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "#eeeeee";
	
	context.fillRect(0, 0, cw, ch);

	let options = {
		font: "normal",
		color: "dark",
		size: 2,
		text: "Enter to accept - Escape or Click/Tap to cancel"
	};

	callback.setText(context, cw / 12 * 10, options);
	context.fillText("Enter your answer", cw / 2, ch / 4);
	context.fillText("...", cw / 2, ch / 2);
	context.fillText(options.text, cw / 2, ch / 4 * 3);
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

	if (!callback.editor.answerPopup) {
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

		buttonLocations.push({
			loc: {
				x0: 0,
				x1: ch / 12 * 1.5,
				y0: ch - (ch / 12 * 2.2),
				y1: (ch - (ch / 12 * 2.2)) + (ch / 12)
			},
			ref: "e_importJSON"
		});

		buttonLocations.push({
			loc: {
				x0: 0,
				x1: ch / 12 * 1.5,
				y0: ch - (ch / 12 * 3.4),
				y1: (ch - (ch / 12 * 3.4)) + (ch / 12)
			},
			ref: "e_exportJSON"
		});
	}

	callback.state.buttons = buttonLocations;

}

const answers = (context, callback, cw, ch) => {

	let buttonLocations = [];
	let options = {
		font: "mono",
		color: "white",
		size: 2,
		text: "-"
	};

	context.globalAlpha = 1;

	const answerRatio = (ch / 12 * 7) / (callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length);

	for (let i = 0; i < callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length; i++) {

		// render answer
		context.fillStyle = "#222222";
		context.fillRect(
			ch / 12 * 2,
			(ch / 12 * 4.5) + (answerRatio * i),
			cw - (ch / 12 * 4),
			answerRatio * 0.9
		);

		options.text = "answer description";
		options.size = 3;
		options.font = "normal";
		callback.setText(context, cw - (ch / 12 * 5), options);
		context.fillText(
			options.text,
			(ch / 12 * 2) + ((cw - (ch / 12 * 4)) / 2) - (ch / 24),
			((ch / 12 * 4.5) + (answerRatio * i)) + ((answerRatio * 0.9) / 2)
		);

		// remove button
		context.fillStyle = "#FF4444";
		context.fillRect(
			cw - (ch / 12 * 3),
			(ch / 12 * 4.5) + (answerRatio * i),
			ch / 12,
			answerRatio * 0.9
		);
		options.size = 2;
		options.font = "mono";
		options.text = "-";
		callback.setText(context, ch / 12, options);
		context.fillText(
			options.text,
			(cw - (ch / 12 * 2.5)),
			(ch / 12 * 4.5) + (answerRatio * i) + ((answerRatio * 0.9) / 2)
		);

		if (!callback.editor.answerPopup) {
			buttonLocations.push({
				loc: {
					x0: cw - (ch / 12 * 3),
					x1: (cw - (ch / 12 * 3)) + (ch / 12),
					y0: (ch / 12 * 4.5) + (answerRatio * i),
					y1: (ch / 12 * 4.5) + (answerRatio * i) + (answerRatio * 0.9)
				},
				ref: "e_removeAnswer-" + i
			});

			buttonLocations.push({
				loc: {
					x0: ch / 12 * 2,
					x1: (ch / 12 * 2) + (cw - (ch / 12 * 5)),
					y0: (ch / 12 * 4.5) + (answerRatio * i),
					y1: (ch / 12 * 4.5) + (answerRatio * i) + (answerRatio * 0.9)
				},
				ref: "e_showPopup"
			});
		}
		callback.state.buttons.push(...buttonLocations);
	}

	
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
	answers(context, callback, cw, ch);
	mainText(context, callback, cw, ch);

	if (callback.editor.answerPopup) {answerPopup(context, callback, cw, ch);}
	if (!callback.state.allowInput) {textboxPopup(context, callback, cw, ch);}

}

// Export
export {editorAnimation};