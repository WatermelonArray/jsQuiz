"use strict";

// functions
const checkMouseOver = (vec2, arr) => {

	let result = false;
	let questionNumber = undefined;

	for (let i = 0; i < arr.length; i++) {
		let x0 = arr[i].loc.x0 // start x
		let x1 = arr[i].loc.x1 // end x
		let y0 = arr[i].loc.y0 // start y
		let y1 = arr[i].loc.y1 // end y

//				 x start		 x end			 y start		 y end
		if (vec2.x >= x0 && vec2.x <= x1 && vec2.y >= y0 && vec2.y <= y1) {result = true; questionNumber = i};
	}
	return result, questionNumber
}

const handleInput = (input, aArgs) => {

	const page = aArgs.currentState.currentPage

	if (input == "forward") {
		if (page == "title") {
			aArgs.changePage("menu");
		}
		else if(page == "menu") {
			aArgs.changePage("game");
		}
	}
	else if (input == "back") {
		if (page == "menu") {
			aArgs.changePage("title");
		}
		else if(page == "game") {
			aArgs.changePage("menu");
		}
	}
	else if (input == "click") {}
	else if (input == "help") {}
}

// events
const mouse = (callback) => {
	document.addEventListener("mousedown", function(input) {
		if (input.button == 0) {
			let result, question = checkMouseOver({x: input.clientX, y: input.clientY}, callback.currentState.buttons);
			callback.calcAnswer(result, callback.currentPage.currentQuiz.questions[callback.currentState.questionNumber].answers[question].isAnswer);
		}
	})
}

const keyboard = (gameState) => {
	document.addEventListener("keydown", function(input) {
		if (input.key == "Enter") {handleInput("forward", gameState)}
		if (input.key == "Backspace") {handleInput("back", gameState)}
	})
}

// method
const setupInput = (state) => {
	mouse(state);
	keyboard(state);
}

// export
export {setupInput};