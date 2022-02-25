"use strict";

// functions

const checkMousePos = (vec2, i) => {return vec2.x >= i.loc.x0 && vec2.x <= i.loc.x1 && vec2.y >= i.loc.y0 && vec2.y <= i.loc.y1;}

const checkMouseOverQuiz = (vec2, arr) => {

	let result = false;
	let questionNumber = 0;

	for (let i = 0; i < arr.length; i++) {
		if (checkMousePos(vec2, arr[i])) {
			if (arr[i].ref === "confirm") {result = true; questionNumber = "confirm";}
			else if (arr[i].ref === "help") {result = true; questionNumber = "help";}
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

	if (input === "forward") {
		if (callback.state.confirmPopup) {
			callback.state.allowInput = false;
			callback.resetFuncs.transition();
			callback.state.transition = "fade";
			callback.state.transitionTo = "menu";
		}
		if (page === "title") {
			callback.state.allowInput = false;
			callback.resetFuncs.transition();
			callback.state.transition = "fade";
			callback.state.transitionTo = "menu";
		}
	}
	else if (input === "back" && !callback.editor.textboxPopup) {
		if (callback.state.helpPopup) {callback.state.helpPopup = false;}
		else {
			if (page === "menu") {
				callback.state.allowInput = false;
				callback.resetFuncs.transition();
				callback.resetFuncs.title();
				callback.state.transition = "fade";
				callback.state.transitionTo = "title";
			}
			else if (page === "game") {
				if (!callback.state.confirmPopup) {callback.state.confirmPopup = true;}
				else {callback.state.confirmPopup = false;}
			}
			else if (page === "editor") {
				if (callback.editor.answerPopup) {callback.editor.closePopup(callback);}
				else {
					if (!callback.state.confirmPopup) {callback.state.confirmPopup = true;}
					else {callback.state.confirmPopup = false;}
				}
			}
		}
	}
}

const handleInputPosition = (input, callback) => {
	if (callback.state.confirmPopup) {
		const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.confirmButtons);

		if (result) {
			if (buttonType === "confirmClose") {
				callback.playSound("click");
				callback.state.confirmPopup = false;
			}
			else if (buttonType === "confirmAccept") {
				callback.playSound("click");
				callback.setMusic();
				callback.state.allowInput = false;
				callback.resetFuncs.transition();
				callback.state.transition = "fade";
				callback.state.transitionTo = "menu";
			}
		}
	}
	else if (callback.state.helpPopup) {
		const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.helpButtons);
		if (result) {
			if (buttonType === "helpClose") {
				callback.playSound("click");
				callback.state.helpPopup = false;
			}
		
		}
	}
	else if (callback.state.page === "game") {

		const [result, question] = checkMouseOverQuiz({x: input.clientX, y: input.clientY}, callback.state.quizButtons);

		const questionRef = callback.state.quiz.questions[callback.state.questionNumber].answers[question];
		if (result) {
			if (question === "confirm") {
				callback.playSound("click");
				callback.state.confirmPopup = true;
			}
			else if (question === "help") {
				callback.playSound("click");
				callback.state.helpPopup = true;
			}
			else {
				callback.calcAnswer(questionRef.description, questionRef.isAnswer);
			}
		}
	}
	else if (callback.state.page === "result" || callback.state.page === "menu" || callback.state.page === "answer" || callback.state.page == "editor") {

		const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.buttons);

		if (result) {
			// game
			if (buttonType === "nextQuestion") {
				callback.playSound("click");
				callback.setMusic();
				callback.newQuestion(callback);
			}
			else if (buttonType === "confirm") {
				callback.state.confirmPopup = true;
				callback.playSound("click");
			}
			else if (buttonType === "help") {
				callback.state.helpPopup = true;
				callback.playSound("click");
			}

			//editor
			else if (buttonType === "e_playQuiz") {callback.editor.playQuiz(callback);}
			else if (buttonType === "e_changeQuizName") {
				callback.editor.textboxSelect = "quiz";
				callback.editor.enterText(callback);
			}
			else if (buttonType === "e_changeQuestionSubject") {
				callback.editor.textboxSelect = "question";
				callback.editor.enterText(callback);
			}

			else if (buttonType === "e_addQuestion") {callback.editor.addQuestion(callback);}
			else if (buttonType === "e_removeQuestion") {callback.editor.removeQuestion(callback);}
			else if (buttonType === "e_changeQuestionLeft") {callback.editor.changeQuestion(callback, -1);}
			else if (buttonType === "e_changeQuestionRight") {callback.editor.changeQuestion(callback, 1);}

			else if (buttonType === "e_addAnswer") {callback.editor.addAnswer(callback);}
			else if (buttonType.substring(0, 14) === "e_removeAnswer") {
				callback.editor.removeAnswer(callback, buttonType.substring(16, buttonType.length));
			}

			else if (buttonType.substring(0, 11) === "e_showPopup") {callback.editor.showPopup(callback, buttonType.substring(12, buttonType.length));}
			else if (buttonType === "e_closePopup") {callback.editor.closePopup(callback);}

			else if (buttonType === "e_enterText") {
				callback.editor.textboxSelect = "answer";
				callback.editor.enterText(callback);
			}
			else if (buttonType.substring(0, 19) === "e_changeAnswerValue") {callback.editor.changeValue(callback, buttonType.substring(20, buttonType.length));}
			else if (buttonType === "e_exportJSON") {callback.editor.exportJSON(callback);}
			else if (buttonType === "e_importJSON") {
				callback.editor.textboxSelect = "import";
				callback.editor.enterText(callback);
			}

			else {
				callback.playSound("click");
				callback.state.allowInput = false;
				callback.resetFuncs.transition();
				callback.state.transition = "swipe";
				callback.state.transitionTo = buttonType;
				callback.state.score = 0;
			}
		}
	}

	const [result, buttonType] = checkMouseOver({x: input.clientX, y: input.clientY}, callback.state.muteButtons);
	if (result) {callback.muteAudio();}
	else if (callback.state.page === "title") {
		callback.setMusic();
		callback.playSound("confirm");
		handleInput("forward", callback);
	}
}

// events
const mouse = (callback) => {
	document.addEventListener("mousedown", function(input) {
		if (callback.state.allowInput && input.button === 0 ) {
			handleInputPosition(input, callback);
		}
	})
}

const keyboard = (callback) => {
	document.addEventListener("keydown", function(input) {
		if (callback.state.allowInput) {
			if (input.key === "Enter") {handleInput("forward", callback);}
			else if (input.key === "Backspace") {handleInput("back", callback);}
			else if (!(callback.state.page === "title") && (input.key === "h" || input.key === "F1")) {callback.state.helpPopup = !callback.state.helpPopup;}
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
const setupInput = (callback) => {
	mouse(callback);
	keyboard(callback);
	touch(callback);
}

// export
export {setupInput};