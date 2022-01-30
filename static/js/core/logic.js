"use strict";

const checkQuestionLimit = (callback) => {

	if (callback.currentState.questionNumber > Object.keys(callback.currentQuiz.questions).length) {
		console.log("MAX LIMIT")
	}
}

// method
const setLogic = (callback) => {

	callback.calcAnswer = (x) => {
		if (callback.currentState.allowAnswer) {
			if (x) {
				callback.currentState.answerResponse = 2;
				callback.currentState.score++;
			}
			else {
				callback.currentState.answerResponse = 1;
			}
			callback.currentState.allowAnswer = false;
			setTimeout(function() {
				callback.currentState.answerResponse = 0;
				callback.currentState.questionNumber++;
				checkQuestionLimit(callback);
				callback.currentState.allowAnswer = true;
			}, 20);
		}
	};

}

export {setLogic};