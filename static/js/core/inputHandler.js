"use strict";

// functions
const checkMouseOver = (vec2, arr) => {

	let result = false;
	let questionNumber = 0;

	for (let i = 0; i < arr.length; i++) {
		let x0 = arr[i].loc.x0 // start x
		let x1 = arr[i].loc.x1 // end x
		let y0 = arr[i].loc.y0 // start y
		let y1 = arr[i].loc.y1 // end y

//				 x start		 x end			 y start		 y end
		if (vec2.x >= x0 && vec2.x <= x1 && vec2.y >= y0 && vec2.y <= y1) {result = true; questionNumber = i; break;};
	}

	return [result, questionNumber]
}

const handleInput = (input, callback) => {

	const page = callback.state.page

	if (input == "forward") {
		if (page == "title") {
			callback.changePage("menu");
		}
		else if(page == "menu") {
			callback.changePage("game");
		}
	}
	else if (input == "back") {
		if (page == "menu") {
			callback.changePage("title");
		}
		else if(page == "game") {
			callback.changePage("menu");
		}
	}
	else if (input == "click") {}
	else if (input == "help") {}
}

// events
const mouse = (callback) => {
	document.addEventListener("mousedown", function(input) {
		if (input.button == 0) {
			if (callback.state.page == "game") {

				const [result, question] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.quizButtons);

				console.log(result)

				if (result) {
					callback.calcAnswer(callback.state.quiz.questions[callback.state.questionNumber].answers[question].isAnswer);
				}
			}
		}
	})
}

const keyboard = (callback) => {
	document.addEventListener("keydown", function(input) {
		if (input.key == "Enter") {handleInput("forward", callback)}
		if (input.key == "Backspace") {handleInput("back", callback)}
	})
}

// method
const setupInput = (state) => {
	mouse(state);
	keyboard(state);
}

// export
export {setupInput};``