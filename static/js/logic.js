"use strict";

let loggedScore = 0;

function calculateAnswer(answer) {
	if (answer.isAnswer) {
		score++;
	}
	return answer.isAnswer;
};

function getScore(jsonData) {
	const scoreArray = {
		totalScore: Object.keys(jsonData.questions).length,
		score: loggedScore
	};
	return scoreArray;
}

export {getScore, calculateAnswer};