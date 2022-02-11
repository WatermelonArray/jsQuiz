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

	//console.log(callback.state.questionNumber + 1)
	if (callback.state.questionNumber + 1 > Object.keys(callback.state.quiz.questions).length) {
		callback.state.questionNumber = 0;
		callback.state.answerResponse = 0;
	
		callback.resetFuncs.transition();
		callback.state.transition = "fade";
		callback.state.transitionTo = "result";
		//callback.changePage("result");
	}
	else {
		callback.state.questionNumber++;
		let a = [];
		for (let i = 0; i < Object.keys(callback.state.quiz.questions[callback.state.questionNumber].answers).length; i++) {
			a.push(callback.state.quiz.questions[callback.state.questionNumber].answers[i].description);
		}
		callback.state.allowInput = false;
		//console.log(callback)
		callback.resetFuncs.transition();
		callback.state.transition = "swipe";
		callback.state.transitionTo = "game";
		//callback.state.answerResponse = 0;
		callback.state.answerList = a;
		//callback.changePage("game");
	}
}

// method
const setupLogic = (callback) => {

	callback.newQuestion = setQuiz;

	callback.calcAnswer = (x, y) => {
		if (callback.state.allowAnswer && callback.state.page == "game") {
			//console.log(y, x)
			if (y) {
				callback.state.answerResponse = 2;
				callback.state.score++;
			}
			else {
				callback.state.correctAnswer = findAnswers(callback);
				callback.state.answerText = x;
				callback.state.answerResponse = 1;
			}
			//callback.state.allowAnswer = false;
			callback.changePage("answer");
		}
	}

}

export {setupLogic};