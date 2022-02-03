"use strict";

let blackFrame = 0;
let timer = 0;
let reverse = false;
const transitionIn = (canvas, context, switchAmim, to) => {

	const cw = canvas.width;
	const ch = canvas.height;

	if (blackFrame < 1 && !reverse) {
		blackFrame = blackFrame + 0.1;
		if (blackFrame > 1) {
			blackFrame = 1;
			switchAmim(to);
		}
	}

	context.fillStyle = "#000000";
	context.globalAlpha = blackFrame;
	context.fillRect(0, 0, cw, ch);

}

const transitionOut = (canvas, context) => {
	
	const cw = canvas.width;
	const ch = canvas.height;
	
	if (blackFrame > 0 && reverse) {
		blackFrame = blackFrame - 0.1;
		if (blackFrame < 0) {
			blackFrame = 0;
			reverse = 0;
			timer = 0;
		}
	}
	
	if (blackFrame == 1 && timer < 60) {timer++;}
	else if (blackFrame == 1 && timer >= 60) {timer = 0; reverse = true;}

	context.fillStyle = "#000000";
	context.globalAlpha = blackFrame;
	context.fillRect(0, 0, cw, ch);
}

export {transitionIn, transitionOut};