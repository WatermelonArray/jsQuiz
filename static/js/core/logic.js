"use strict";
// functions
const setQuiz = (callback) => {

	let a = [];
	for (let i = 0; i < Object.keys(callback.state.quiz.questions[callback.state.questionNumber].answers).length; i++) {
		a.push(callback.state.quiz.questions[callback.state.questionNumber].answers[i].description);
	}
	callback.state.answerList = a;

}

// method
const setLogic = (callback) => {

	callback.newQuestion = setQuiz;

	callback.calcAnswer = (x) => {
		if (callback.state.allowAnswer && callback.state.page == "game") {
			console.log(x)
			if (x) {
				callback.state.answerResponse = 2;
				callback.state.score++;
			}
			else {
				callback.state.answerResponse = 1;
			}
			callback.state.allowAnswer = false;
			callback.changePage("answer")
			setTimeout(function() {
				
				callback.state.questionNumber++;
				const limit = callback.state.questionNumber > Object.keys(callback.state.quiz.questions).length;
				if (limit) {
					callback.state.allowAnswer = true;
					callback.state.questionNumber = 1;
					callback.state.answerResponse = 0;
					callback.changePage("result");
					callback.newQuestion(callback); // just reset question system
				}
				else {
					callback.newQuestion(callback);
					callback.changePage("game")
					callback.state.answerResponse = 0;
					callback.state.allowAnswer = true;
				}
			}, 4*1000);
		}
	}

}

export {setLogic};