"use strict";

function calculateAnswer(answer, callback) {
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

const setLogic = (x, callback) => {

	if (x == "addScore") {
		if (calculateAnswer()) {
			callback.addScore();
		}
	}

}

export {setLogic};