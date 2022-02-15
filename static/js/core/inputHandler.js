"use strict";

// functions

const checkMousePos = (vec2, i) => {return vec2.x >= i.loc.x0 && vec2.x <= i.loc.x1 && vec2.y >= i.loc.y0 && vec2.y <= i.loc.y1;}

const checkMouseOverQuiz = (vec2, arr) => {

	let result = false;
	let questionNumber = 0;

	for (let i = 0; i < arr.length; i++) {
		if (checkMousePos(vec2, arr[i])) {
			if (arr[i].ref == "confirm") {result = true; questionNumber = "confirm";}
			else if (arr[i].ref == "help") {result = true; questionNumber = "help";}
			else {
				result = true; questionNumber = i; break;
			}
		}
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

	const page = callback.state.page;

	if (input == "forward") {
		if (page == "title") {
			callback.state.allowInput = false;
			callback.resetFuncs.transition();
			callback.state.transition = "fade"
			callback.state.transitionTo = "menu"
		}
	}
	else if (input == "back") {
		if (page == "menu") {
			callback.state.allowInput = false;
			callback.resetFuncs.transition();
			callback.resetFuncs.title();
			callback.state.transition = "fade"
			callback.state.transitionTo = "title"
		}
		else if (page == "game" || page == "help" || page == "editor") {
			if (page == "game") {callback.state.questionNumber = 0;}
			callback.state.allowInput = false;
			callback.resetFuncs.transition();
			callback.state.transition = "swipe"
			callback.state.transitionTo = "menu"
		}
	}
}

const handleInputPosition = (input, callback) => {
	if (callback.state.confirmPopup) {
		const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.confirmButtons);

		if (result) {
			if (buttonType == "confirmClose") {callback.state.confirmPopup = false;}
			else if (buttonType == "confirmAccept") {
				//callback.state.questionNumber = 0;
				//callback.state.score = 0;
				callback.state.allowInput = false;
				callback.resetFuncs.transition();
				callback.state.transition = "fade";
				callback.state.transitionTo = "menu";
			}
		}
	}
	else if (callback.state.helpPopup) {
		const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.helpButtons);
		if (result) {if (buttonType == "helpClose") {callback.state.helpPopup = false;}}
	}
	else if (callback.state.page == "game") {

		const [result, question] = checkMouseOverQuiz({x: input.clientX, y: input.clientY}, callback.state.quizButtons);

		const questionRef = callback.state.quiz.questions[callback.state.questionNumber].answers[question];
		if (result) {
			if (question == "confirm") {callback.state.confirmPopup = true;}
			else if (question == "help") {callback.state.helpPopup = true;}
			else {
				callback.calcAnswer(questionRef.description, questionRef.isAnswer);
			}
		}
	}
	else if (callback.state.page == "result" || callback.state.page == "menu" || callback.state.page == "answer") {

		const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.buttons);

		if (result) {
			if (buttonType == "nextQuestion") {callback.newQuestion(callback);}
			else if (buttonType == "menu") {
				callback.state.questionNumber = 0;
				callback.state.score = 0;
				callback.state.allowInput = false;
				callback.resetFuncs.transition();
				callback.state.transition = "swipe";
				callback.state.transitionTo = buttonType;
			}
			else if (buttonType == "confirm") {callback.state.confirmPopup = true;}
			else if (buttonType == "help") {callback.state.helpPopup = true;}
			else {
				callback.state.allowInput = false;
				callback.resetFuncs.transition();
				callback.state.transition = "swipe";
				callback.state.transitionTo = buttonType;
				callback.state.score = 0;
			}
		}
	}
	else if (callback.state.page == "title") {
		handleInput("forward", callback);
	}
}

// events
const mouse = (callback) => {
	document.addEventListener("mousedown", function(input) {
		if (callback.state.allowInput && input.button == 0 ) {
			handleInputPosition(input, callback);
		}
	})
}

const keyboard = (callback) => {
	document.addEventListener("keydown", function(input) {
		if (callback.state.allowInput) {
			if (input.key == "Enter") {handleInput("forward", callback);}
			if (input.key == "Backspace") {handleInput("back", callback);}
		}
	})
}

const touch = (callback) => {
	document.addEventListener("touchstart", function(input) {
		if (callback.state.allowInput) {
			handleInputPosition(input, callback);
		}
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