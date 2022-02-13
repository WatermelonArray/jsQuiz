"use strict";

let time = 0;
let delay = 0;

const fade = (context, callback, cw, ch) => {

	const fadeTime = 80;
	context.fillStyle = "#222222";

	if (time > delay && time <= (fadeTime + delay)) {
		const transparency = callback.lerp(2 / (time - delay), 1.1, 0);
		if (transparency > 0) {context.globalAlpha = transparency;}
		else {context.globalAlpha = 0;}
		context.fillRect(0, 0, cw, ch);
	}
	else if (time > delay && time > (fadeTime + delay)) {
		if (callback.state.transitionTo != "") {
			callback.state.allowInput = true;
			callback.changePage(callback.state.transitionTo);
			callback.state.transitionTo = "";
			if (callback.state.finish) {callback.state.finish = false;}
		}
		
		const transparency = callback.lerp(2 / ((time - delay) - fadeTime), -0.1, 1)
		if (transparency > 0) {context.globalAlpha = transparency;}
		else if (transparency <= 0) {context.globalAlpha = 0}
		context.fillRect(0, 0, cw, ch);
	}

}

const swipe = (context, callback, cw, ch) => {

	const swipeTime = 80;

	context.globalAlpha = 1;
	context.fillStyle = "#222222";

	if (time <= swipeTime) {
		context.fillRect(
			0,
			0,
			cw,
			callback.lerp(2 / time, ch + 100, 0)
		);
	}
	else if (time > swipeTime) {
		if (callback.state.transitionTo != "") {
			callback.state.allowInput = true;
			callback.changePage(callback.state.transitionTo);
			callback.state.transitionTo = "";
			if (callback.state.answerResponse != 0) {
				callback.state.answerResponse = 0;
			}
			if (callback.state.questionNumber + 1 > Object.keys(callback.state.quiz.questions).length) {callback.state.finish = true;}
		}
		const y = callback.lerp(2 / (time - swipeTime), ch + 100, 0);
		if (y > 0) {
			context.fillRect(
				0,
				y,
				cw,
				ch * 1.2
			);
		}
		else {
			context.fillRect(
				0,
				0,
				cw,
				ch
			);
		}
	}
}

const transitionSet = (canvas, context, callback) => {

	// reset
	if (!(callback.resetFuncs.transition)) {console.log("e"); callback.resetFuncs.transition = function() {time = 0;}}

	time++;
	const cw = canvas.width;
	const ch = canvas.height;

	if (callback.state.transition == "swipe") {swipe(context, callback, cw, ch);}
	else if (callback.state.transition == "fade") {fade(context, callback, cw, ch);}

}

export {transitionSet};