"use strict";

const addQuestion = (callback) => {
	callback.editor.questionList.push({
		question: "Hello World",
		answers: []
	});
};

const removeQuestion = (callback) => {
	if (callback.editor.questionList.length > 1) {
		if (callback.editor.currentQuestion === callback.editor.questionList.length) {
			callback.editor.currentQuestion--;
			callback.editor.questionList.splice(callback.editor.currentQuestion, 1);
		}
		callback.editor.questionList.splice(callback.editor.currentQuestion, 1);
	}
};

const changeQuestion = (callback, dir) => {
	console.log(callback.editor.currentQuestion + dir > 0 && callback.editor.currentQuestion + dir <= callback.editor.questionList.length);
	if (callback.editor.currentQuestion + dir > 0 && callback.editor.currentQuestion + dir <= callback.editor.questionList.length) {
		callback.editor.currentQuestion = callback.editor.currentQuestion + dir;
	}
};

const addAnswer = (callback) => {
	if (callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length < 6) {
		callback.editor.questionList[callback.editor.currentQuestion - 1].answers.push({
			description: "A",
			isAnswer: false
		});
	}
};

const removeAnswer = (callback, index) => {
	if (callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length > 0) {
		callback.editor.questionList[callback.editor.currentQuestion - 1].answers.splice(index - 1, 1);
	}
};

const setupEditor = (callback) => {

	callback.editor.addQuestion = addQuestion;
	callback.editor.removeQuestion = removeQuestion;
	callback.editor.changeQuestion = changeQuestion;
	callback.editor.addAnswer = addAnswer;
	callback.editor.removeAnswer = removeAnswer;

	callback.editor.questionList.push({
		question: "Hello World",
		answers: []
	});

};

export {setupEditor};