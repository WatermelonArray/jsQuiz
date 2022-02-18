"use strict";

const addQuestion = (callback) => {
	callback.editor.questionList.push(JSON.parse(JSON.stringify(callback.editor.templates.question)));
};

const removeQuestion = (callback) => {
	if (callback.editor.questionList.length > 1) {
		if (callback.editor.currentQuestion === callback.editor.questionList.length){
			callback.editor.currentQuestion--;
			callback.editor.questionList.splice(callback.editor.currentQuestion, 1);
		}
		callback.editor.questionList.splice(callback.editor.currentQuestion, 1);
	}
};

const changeQuestion = (callback, dir) => {
	console.log(callback.editor.currentQuestion + dir > 0 && callback.editor.currentQuestion + dir <= callback.editor.questionList.length)
	if (callback.editor.currentQuestion + dir > 0 && callback.editor.currentQuestion + dir <= callback.editor.questionList.length) {
		callback.editor.currentQuestion = callback.editor.currentQuestion + dir;
	}
};

const addAnswer = (callback) => {
	callback.editor.questionList[callback.editor.currentQuestion - 1].answers.push(JSON.parse(JSON.stringify(callback.editor.templates.answer)));
};

const setupEditor = (callback) => {

	callback.editor.addQuestion = addQuestion;
	callback.editor.addAnswer = addAnswer;
	callback.editor.removeQuestion = removeQuestion;
	callback.editor.changeQuestion = changeQuestion;

	callback.editor.questionList.push(callback.editor.templates.question);

}

export {setupEditor};