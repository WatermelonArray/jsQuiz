"use strict";

// for future reference: https://softwareengineering.stackexchange.com/questions/119181/what-type-of-encoding-can-i-use-to-make-a-string-shorter

// setup methods
import {questionAnswer, questionTemplate} from "./jsonClass.js";		// for compiling to json (custom quizes in the future)
import {getScore, calculateAnswer} from "./logic.js";					// the logic for handling score
import {draw, quizRender} from "./render.js";										// the renderer for the game
import {handleKeyboard} from "./inputHandler.js";						// input handling for the game

// debug method
import {logQuizData} from "./debugger.js"; 								// only for debugging purposes

// grab testing quiz
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/json

try {
	let quizTestFile = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
	quizTestFile = await quizTestFile.json();
	logQuizData(quizTestFile);
	quizRender(quizTestFile);
	draw();	// start running renderer
}
catch(error) {
	console.warn(error.message);
}

