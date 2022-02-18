"use strict";

// setup classes
let questionAnswer = {
	description: "A",
	isAnswer: false
};

let questionTemplate = {
	question: "Hello World",
	answers: []
};

const editorJSON = (callback) => {

	callback.editor.templates.question = questionTemplate;
	callback.editor.templates.answer = questionAnswer;

};

export {editorJSON};