"use strict";

// functions

const checkMousePos = (vec2, i) => {return vec2.x >= i.loc.x0 && vec2.x <= i.loc.x1 && vec2.y >= i.loc.y0 && vec2.y <= i.loc.y1;}

const checkMouseOverQuiz = (vec2, arr) => {

	let result = false;
	let questionNumber = 0;

	for (let i = 0; i < arr.length; i++) {
		if (checkMousePos(vec2, arr[i])) {result = true; questionNumber = i; break;}
	}

	return [result, questionNumber];
}

const checkMouseOver = (vec2, arr) => {

	let result = false;
	let buttonType = "";

	for (let i = 0; i < arr.length; i++) {
		if (checkMousePos(vec2, arr[i])) {result = true; buttonType = arr[i].ref; break;}
	}

	return [result, buttonType];
}

const handleInput = (input, callback) => {

	const page = callback.state.page

	if (input == "forward") {
		if (page == "title") {
			callback.changePage("menu");
		}
//		else if (page == "menu") {
//			callback.changePage("game");
//		}
	}
	else if (input == "back") {
		if (page == "menu") {
			callback.changePage("title");
		}
		else if (page == "game" || page == "help" || page == "editor") {
			callback.changePage("menu");
		}
	}
}

const handleInputPosition = (input, callback) => {
	console.log(input)
	if (callback.state.page == "game") {

		const [result, question] = checkMouseOverQuiz({x: input.clientX, y: input.clientY}, callback.state.quizButtons);

		if (result) {
			callback.calcAnswer(callback.state.quiz.questions[callback.state.questionNumber].answers[question].isAnswer);
		}
	}
	else if (callback.state.page == "result" || callback.state.page == "menu" || callback.state.page == "help") {

		const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.buttons);

		if (result) {
			callback.state.score = 0;
			callback.changePage(buttonType);
		}
	}
	else if (callback.state.page == "title") {
		handleInput("forward", callback);
	}
}

// events
let debounce = false;
const mouse = (callback) => {
	document.addEventListener("mousedown", function(input) {
		if (input.button == 0 ) {
			handleInputPosition(input, callback);
		}
	})
}

const keyboard = (callback) => {
	document.addEventListener("keydown", function(input) {
		if (input.key == "Enter") {handleInput("forward", callback);}
		if (input.key == "Backspace") {handleInput("back", callback);}
	})
}

const touch = (callback) => {
	document.addEventListener("touchstart", function(input) {
		//input.preventDefault();
		//debounce = true;
		handleInputPosition(input, callback);
	})
}
// method
const setupInput = (state) => {
	mouse(state);
	keyboard(state);
	touch(state);
}

// export
export {setupInput};