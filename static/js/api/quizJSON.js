"use strict";

// setup classes
const questionAnswer = {
	description: "A",
	isAnswer: false
};

const questionTemplate = {
	question: "Hello World",
	answers: []
};

const editorJSON = (callback) => {

	callback.editor.templates.question = questionTemplate;
	callback.editor.templates.answer = questionAnswer;

};

export {editorJSON};