"use strict";

const addQuestion = (callback) => {
	callback.playSound("click");
	callback.editor.questionList.push({
		question: "Question Subject",
		answers: []
	});
}

const removeQuestion = (callback) => {
	callback.playSound("click");
	if (callback.editor.questionList.length > 1) {
		if (callback.editor.currentQuestion === callback.editor.questionList.length) {
			callback.editor.currentQuestion--;
			callback.editor.questionList.splice(callback.editor.currentQuestion, 1);
		}
		callback.editor.questionList.splice(callback.editor.currentQuestion, 1);
	}
}

const changeQuestion = (callback, dir) => {
	callback.playSound("click");
	if (callback.editor.currentQuestion + dir > 0 && callback.editor.currentQuestion + dir <= callback.editor.questionList.length) {
		callback.editor.currentQuestion = callback.editor.currentQuestion + dir;
	}
}

const addAnswer = (callback) => {
	callback.playSound("click");
	if (callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length < 6) {
		callback.editor.questionList[callback.editor.currentQuestion - 1].answers.push({
			description: "Answer Description",
			isAnswer: false
		});
	}
}

const removeAnswer = (callback, index) => {
	callback.playSound("click");
	if (callback.editor.questionList[callback.editor.currentQuestion - 1].answers.length > 0) {
		callback.editor.answerPopup = false;
		callback.editor.questionList[callback.editor.currentQuestion - 1].answers.splice(index - 1, 1);
	}
}

const answerPopupShow = (callback, answer) => {
	callback.playSound("click");
	callback.editor.selectedAnswer = answer;
	callback.editor.answerPopup = true;
}

const answerPopupClose = (callback) => {
	callback.playSound("click");
	callback.editor.answerPopup = false;
}

const textboxEnter = (callback) => {
	callback.playSound("click");
	callback.textboxInput(callback);
}

const changeValue = (callback, index) => {
	callback.playSound("click");
	const bool = callback.editor.questionList[callback.editor.currentQuestion - 1].answers[index].isAnswer;
	callback.editor.questionList[callback.editor.currentQuestion - 1].answers[index].isAnswer = !bool;
}

const exportJSON = (callback) => {

	let allowed = true;
	let reason = "";
	let quiz = {"quizName": callback.editor.quizName};
	let tempObj = {};

	for (let i = 0; i < callback.editor.questionList.length; i++) {
		if (callback.editor.questionList[i].answers.length === 0) {
			allowed = false;
			reason = "Some questions have blank answers!";
			break;
		}
		else {
			let hasAnswer = false;
			for (let x = 0; x < callback.editor.questionList[i].answers.length; x++) {
				if (callback.editor.questionList[i].answers[x].isAnswer && !hasAnswer) {hasAnswer = true;}
			}
			if (!hasAnswer) {
					allowed = false;
					reason = "Some questions have no correct answer set!";
					break;
				}
			else {tempObj[i + 1] = callback.editor.questionList[i];}
		}
	}
	if (allowed) {

		callback.playSound("correct");

		callback.editor.importFailed = false;
		callback.editor.exportSuccess = true;
		callback.state.allowInput = false;
		callback.editor.exportPopup = true;

		quiz.questions = tempObj;

		console.log(quiz);
		const base = btoa(JSON.stringify(quiz));
		navigator.clipboard.writeText(base);

		setTimeout(function() {
			callback.editor.exportPopup = false;
			callback.state.allowInput = true;
		}, 3 * 1000);
	}
	else {

		callback.playSound("fail");
		callback.editor.importFailed = false;
		callback.editor.exportSuccess = false;
		callback.editor.exportReason = reason;
		callback.state.allowInput = false;
		callback.editor.exportPopup = true;

		setTimeout(function() {
			callback.editor.exportPopup = false;
			callback.state.allowInput = true;
		}, 3 * 1000);
	}
}

const importJSON = (callback, id) => {

	let temp = "";

	try {temp = JSON.parse(atob(id));}
	catch (err) {

		callback.playSound("fail");

		callback.editor.importFailed = true;
		callback.editor.exportReason = "Import failed, invalid code";
		callback.state.allowInput = false;
		callback.editor.exportPopup = true;

		setTimeout(function() {
			callback.editor.exportPopup = false;
			callback.importFailed = false;
			callback.state.allowInput = true;
		}, 3 * 1000);
	}

	if (!callback.editor.importFailed) {
		callback.playSound("correct");
		callback.editor.currentQuestion = 1;
		callback.editor.quizName = temp.quizName;
		callback.editor.questionList = [...Object.values(temp.questions)];
	}
}

const playQuiz = (callback) => {

	let allowed = true;
	let reason = "";
	let quiz = {"quizName": callback.editor.quizName};
	let tempObj = {};

	for (let i = 0; i < callback.editor.questionList.length; i++) {
		if (callback.editor.questionList[i].answers.length === 0) {
			allowed = false;
			reason = "Some questions have blank answers!";
			break;
		}
		else {
			let hasAnswer = false;
			for (let x = 0; x < callback.editor.questionList[i].answers.length; x++) {
				if (callback.editor.questionList[i].answers[x].isAnswer && !hasAnswer) {hasAnswer = true;}
			}
			if (!hasAnswer) {
					allowed = false;
					reason = "Some questions have no correct answer set!";
					break;
				}
			else {tempObj[i + 1] = callback.editor.questionList[i];}
		}
	}
	if (allowed) {

		callback.setMusic();
		callback.playSound("click");

		quiz.questions = tempObj;
		
		callback.state.questionNumber = 0;
		callback.state.score = 0;
		callback.state.quiz = quiz;

		callback.newQuestion(callback);
	}
	else {

		callback.playSound("fail");

		callback.editor.importFailed = false;
		callback.editor.playQuizFailed = true;
		callback.editor.exportSuccess = false;
		callback.editor.exportReason = reason;
		callback.state.allowInput = false;
		callback.editor.exportPopup = true;

		setTimeout(function() {
			callback.editor.exportPopup = false;
			callback.state.allowInput = true;
		}, 3 * 1000);
	}
}

const setupEditor = (callback) => {

	callback.editor.addQuestion = addQuestion;
	callback.editor.removeQuestion = removeQuestion;
	callback.editor.changeQuestion = changeQuestion;

	callback.editor.addAnswer = addAnswer;
	callback.editor.removeAnswer = removeAnswer;

	callback.editor.showPopup = answerPopupShow;
	callback.editor.closePopup = answerPopupClose;
	callback.editor.changeValue = changeValue;

	callback.editor.enterText = textboxEnter;
	callback.editor.exportJSON = exportJSON;
	callback.editor.importJSON = importJSON;

	callback.editor.playQuiz = playQuiz;

	callback.editor.questionList.push({
		question: "Question Subject",
		answers: []
	});
}

export {setupEditor};