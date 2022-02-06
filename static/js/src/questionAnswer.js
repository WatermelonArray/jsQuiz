"use strict";

const background = (context, callback, cw, ch) => {

	if (callback.state.answerResponse == 2 || callback.state.answerResponse == 0) {context.fillStyle = "#6e9632";}
	if (callback.state.answerResponse == 1 || callback.state.answerResponse == 0) {context.fillStyle = "#963331";}

	context.globalAlpha = 1;
	context.fillRect(0, 0, cw, ch);

}

const text = (context,callback, cw, ch) => {

	let options = {
		text: "Wrong Answer",
		color: "white",
		font: "light",
		size: 2,
	}

	callback.setText(context, cw, options);

	if (callback.state.answerResponse == 2) {

		context.fillText("Wrong answer", cw / 2, ch / 6 * 2);

		options.size = 3;
		options.text = "You chose:"
		callback.setText(context, cw, options);
		context.fillText("You chose: ", cw / 2, ch / 6 * 2.5);

		options.size = 2;
		options.text = "ANSWER";
		options.font = "normal";
		callback.setText(context, cw, options);
		context.fillText("ANSWER", cw / 2, ch / 6 * 2);
	}

	else {context.fillText("Well done!", cw / 2, ch / 2);}

}

const titleText = (context, callback, cw, ch) => {

	let options = {
		text: "Wrong Answer",
		color: "white",
		font: "light",
		size: 1,
	}
	
	callback.setText(context, cw, options);
	if (callback.state.answerResponse == 2) {context.fillText("Wrong Answer", cw / 2, ch / 12 * 1.5);}
	else {context.fillText("Right Answer", cw / 2, ch / 12 * 1.5);}

}

const answerAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, callback, cw, ch);
	text(context, callback, cw, ch);
	titleText(context, callback, cw, ch);
}

export {answerAnimation};