"use strict";

// for future reference: https://softwareengineering.stackexchange.com/questions/119181/what-type-of-encoding-can-i-use-to-make-a-string-shorter

// setup methods
import {questionAnswer, questionTemplate} from "./quizJSONclass.js";		// for compiling to json (custom quizes in the future)
import {getScore, calculateAnswer} from "./quizLogic.js";					// the logic for handling score
import {draw} from "./quizCanvas.js";										// the renderer for the game

// debug method
import {logQuizData} from "./quizDebug.js"; 								// only for debugging purposes

// grab testing quiz
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/json

try {
	let quizTestFile = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
	quizTestFile = await quizTestFile.json();
	logQuizData(quizTestFile);
}
catch(error) {
	console.warn(error.message);
}

draw() // start running renderer
