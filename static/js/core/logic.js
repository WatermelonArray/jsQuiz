"use strict";

// method
const setLogic = (callback) => {

	callback.calcAnswer = (x) => {
		if (callback.state.allowAnswer && callback.state.page == "game") {
			if (x) {
				callback.state.answerResponse = 2;
				callback.state.score++;
			}
			else {
				callback.state.answerResponse = 1;
			}
			callback.state.allowAnswer = false;
			setTimeout(function() {
				callback.state.answerResponse = 0;
				callback.state.questionNumber++;
				const limit = callback.state.questionNumber > Object.keys(callback.state.quiz.questions).length;
				if (limit) {
					callback.state.allowAnswer = true;
					callback.state.questionNumber = 1;
					callback.state.answerResponse = 1;
					callback.changePage("result");
					callback.newQuestion(callback); // just reset question system
				}
				else {
					callback.newQuestion(callback);
					callback.state.allowAnswer = true;
				}
			}, 2*10);
		}
	}

}

export {setLogic};