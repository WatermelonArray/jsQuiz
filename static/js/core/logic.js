"use strict";

// method
const setLogic = (callback) => {

	callback.calcAnswer = (x) => {
		console.log("hi")
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
				const limit = callback.state.questionNumber > Object.keys(callback.state.quiz.questions).length
				callback.state.allowAnswer = true;
			}, 20);
		}
	};

}

export {setLogic};