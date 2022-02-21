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
	if (callback.editor.currentQuestion + dir > 0 && callback.editor.currentQuestion + dir <= callback.editor.questionList.length) {
		callback.editor.currentQuestion = callback.editor.currentQuestion + dir;
	}
};

const addAnswer = (callback) => {
	if (callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length < 6) {
		callback.editor.questionList[callback.editor.currentQuestion - 1].answers.push({
			description: "Answer Description",
			isAnswer: false
		});
	}
};

const removeAnswer = (callback, index) => {
	if (callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length > 0) {
		callback.editor.answerPopup = false;
		callback.editor.questionList[callback.editor.currentQuestion - 1].answers.splice(index - 1, 1);
	}
};

const changeValue = (callback, index) => {
	const bool = callback.editor.questionList[callback.editor.currentQuestion - 1].answers[index].isAnswer;
	callback.editor.questionList[callback.editor.currentQuestion - 1].answers[index].isAnswer = !bool;
};

const answerPopupShow = (callback, answer) => {
	callback.editor.selectedAnswer = answer;
	callback.editor.answerPopup = true;
};

const answerPopupClose = (callback) => {callback.editor.answerPopup = false};

const textboxAnswer = (callback) => {callback.textboxInput(callback);};

const exportJSON = (callback) => {

	let quiz = {"quizName": callback.editor.quizName};
	let tempObj = {};

	for (let i = 0; i < callback.editor.questionList.length; i++) {tempObj[i + 1] = callback.editor.questionList[i];}
	quiz.questions = tempObj;

	const base = btoa(JSON.stringify(quiz));
	navigator.clipboard.writeText(base);
};

const importJSON = (callback, id) => {

	const tempid = "eyJxdWl6TmFtZSI6InF1aXpOYW1lIiwicXVlc3Rpb25zIjp7IjEiOnsicXVlc3Rpb24iOiJIZWxsbyBXb3JsZCIsImFuc3dlcnMiOlt7ImRlc2NyaXB0aW9uIjoiQSIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6IkEiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJBIiwiaXNBbnN3ZXIiOmZhbHNlfV19LCIyIjp7InF1ZXN0aW9uIjoiSGVsbG8gV29ybGQiLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IkEiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJBIiwiaXNBbnN3ZXIiOmZhbHNlfV19LCIzIjp7InF1ZXN0aW9uIjoiSGVsbG8gV29ybGQiLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IkEiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJBIiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiQSIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6IkEiLCJpc0Fuc3dlciI6ZmFsc2V9XX19fQ==";
	const temp = JSON.parse(atob(tempid));

	callback.editor.currentQuestion = 1;
	callback.editor.quizName = temp.quizName;
	callback.editor.questionList = [...Object.values(temp.questions)];
}

const setupEditor = (callback) => {

	callback.editor.addQuestion = addQuestion;
	callback.editor.removeQuestion = removeQuestion;
	callback.editor.changeQuestion = changeQuestion;
	callback.editor.addAnswer = addAnswer;
	callback.editor.removeAnswer = removeAnswer;
	callback.editor.showPopup = answerPopupShow;
	callback.editor.closePopup = answerPopupClose;
	callback.editor.enterText = textboxAnswer;
	callback.editor.exportJSON = exportJSON;
	callback.editor.importJSON = importJSON;
	callback.editor.changeValue = changeValue;

	callback.editor.questionList.push({
		question: "Hello World",
		answers: []
	});

};

export {setupEditor};