"use strict";

function logQuizData(state) {

	const jsonData = state.currentState.quizCurrent;

	const questionsLength = Object.keys(jsonData.questions).length;


	let questArray = [];

	for (let i=0; i < questionsLength; i++) {
		if (i < questionsLength - 1) {
			questArray.push(Object.entries(jsonData.questions)[i][1].question + ",");
		}
		else {
			questArray.push(Object.entries(jsonData.questions)[i][1].question);
		}
	}
	
	// log details	
	console.log("Quiz: " + jsonData.quizName);
	console.log("Num of Questions: " + questionsLength); // https://stackoverflow.com/questions/6756104/get-size-of-json-object
	console.log("Questions:", ...questArray);

	console.log();
	console.log("Quiz raw JSON:");
	console.log(jsonData);
}

export {logQuizData};