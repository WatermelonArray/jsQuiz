"use strict";

const addQuestion = (callback) => {
	callback.editor.questionList.push({
		question: "Question Subject",
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

const answerPopupShow = (callback, answer) => {
	callback.editor.selectedAnswer = answer;
	callback.editor.answerPopup = true;
};

const answerPopupClose = (callback) => {callback.editor.answerPopup = false};

const textboxAnswer = (callback) => {callback.textboxInput(callback);};

const changeValue = (callback, index) => {
	const bool = callback.editor.questionList[callback.editor.currentQuestion - 1].answers[index].isAnswer;
	callback.editor.questionList[callback.editor.currentQuestion - 1].answers[index].isAnswer = !bool;
};

const exportJSON = (callback) => {

	let allowed = true;
	let reason = "";
	let quiz = {"quizName": callback.editor.quizName};
	let tempObj = {};
	
	console.log(callback.editor.questionList)
	for (let i = 0; i < callback.editor.questionList.length; i++) {
		if (callback.editor.questionList[i].answers.length === 0) {
			allowed = false;
			reason = "Some questions blank answers!";
			break;
		}
		else {
			let hasAnswer = false;
			for (let x = 0; x < callback.editor.questionList[i].answers.length; x++) {
				if (callback.editor.questionList[i].answers[x].isAnswer && !hasAnswer) {hasAnswer = true}
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
		quiz.questions = tempObj;

		const base = btoa(JSON.stringify(quiz));
		navigator.clipboard.writeText(base);
	}
	else {console.log(reason)}
};

const importJSON = (callback, id) => {

	const tempid = "eyJxdWl6TmFtZSI6IkVkaXRvciBUZXN0IFF1aXoiLCJxdWVzdGlvbnMiOnsiMSI6eyJxdWVzdGlvbiI6IlF1ZXN0aW9uIDEiLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IkEiLCJpc0Fuc3dlciI6dHJ1ZX0seyJkZXNjcmlwdGlvbiI6IkIiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJDIiwiaXNBbnN3ZXIiOmZhbHNlfV19LCIyIjp7InF1ZXN0aW9uIjoiUXVlc3Rpb24gMiIsImFuc3dlcnMiOlt7ImRlc2NyaXB0aW9uIjoiQSIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6IkIiLCJpc0Fuc3dlciI6dHJ1ZX1dfSwiMyI6eyJxdWVzdGlvbiI6IlF1ZXN0aW9uIDMiLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IkEiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJCIiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiQyIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiRCIsImlzQW5zd2VyIjpmYWxzZX1dfX19";
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
	callback.editor.changeValue = changeValue;

	callback.editor.enterText = textboxAnswer;
	callback.editor.exportJSON = exportJSON;
	callback.editor.importJSON = importJSON;

	callback.editor.questionList.push({
		question: "Hello World",
		answers: []
	});

};

export {setupEditor};