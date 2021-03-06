"use strict";

// functions
const findAnswers = (callback) => {
	const currentQuestions = callback.state.quiz.questions[callback.state.questionNumber].answers;
	let result = "";

	for (let i = 0; i < Object.keys(currentQuestions).length; i++) {
		if (currentQuestions[i].isAnswer) {
			result = result + currentQuestions[i].description;
		}
	}
	return result;
}

const setQuiz = (callback) => {
	if (callback.state.questionNumber + 1 > Object.keys(callback.state.quiz.questions).length) {
		callback.state.questionNumber = 0;
		callback.resetFuncs.transition();
		callback.state.transition = "fade";
		callback.state.transitionTo = "result";
	}
	else {
		callback.state.questionNumber++;
		let a = [];
		for (let i = 0; i < Object.keys(callback.state.quiz.questions[callback.state.questionNumber].answers).length; i++) {
			a.push(callback.state.quiz.questions[callback.state.questionNumber].answers[i].description);
		}
		callback.state.allowInput = false;
		callback.resetFuncs.transition();
		callback.state.transition = "swipe";
		callback.state.transitionTo = "game";
		callback.state.answerList = a;
	}
}

// method
const setupLogic = (callback) => {

	callback.newQuestion = setQuiz;

	callback.calcAnswer = (x, y) => {
		if (callback.state.allowAnswer && callback.state.page === "game") {
			if (y) {
				callback.playSound("correct");
				callback.state.answerResponse = 2;
				callback.state.score++;
			}
			else {
				callback.playSound("fail");
				callback.state.correctAnswer = findAnswers(callback);
				callback.state.answerText = x;
				callback.state.answerResponse = 1;
			}
			callback.changePage("answer");
		}
	}
}

export {setupLogic};