"use strict";

const addQuestion = (callback) => {callback.editor.questionList.push(callback.editor.templates.question);};

const removeQuestion = (callback) => {
	if (callback.editor.questionList.length > 1) {
		callback.editor.questionList.splice(callback.editor.currentQuestion, 1);
	}
};

const addAnswer = (callback) => {callback.editor.questionList[callback.editor.currentQuestion].answers.push(callback.editor.templates.answer);};

const setupEditor = (callback) => {

	callback.addQuestion = addQuestion;
	callback.addAnswer = addAnswer;
	callback.removeQuestion = removeQuestion;

}

export {setupEditor};