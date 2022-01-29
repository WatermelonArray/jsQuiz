"use strict";

// for future reference: https://softwareengineering.stackexchange.com/questions/119181/what-type-of-encoding-can-i-use-to-make-a-string-shorter
//import {questionAnswer, questionTemplate} from "./jsonClass.js";			// for compiling to json (custom quizes in the future)

// setup core modules
import {getScore, calculateAnswer} from "./core/logic.js";					// the logic for handling quiz logic
import {draw, switchAnim, quizRender} from "./core/render.js";							// the renderer for the game
import {setupInput} from "./core/inputHandler.js";						// input handling for the game

// debug module
import {logQuizData} from "./core/debugger.js"; 								// only for debugging purposes

// variables
let currentState = {
	currentPage: "title",
	allowInput: true,
	transition: false,
	allowSkip: true
};

// setup functions
const callback_gameState = (type, x) => {
	if (type == "check") {
		return currentState;
	}
	else if (type == "changePage") {currentState.currentPage = x, switchAnim(currentState.currentPage)}
	else if (type == "changeInput") {currentState.allowInput = x;}
	else if (type == "changeTansition") {currentState.transition = x;}
	else if (type == "changeSkip") {currentState.allowSkip = x;}
}



// start game

setupInput(callback_gameState, switchAnim);

try {
	// grab testing quiz
	// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	// https://developer.mozilla.org/en-US/docs/Web/API/Request/json
	let quizTestFile = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
	quizTestFile = await quizTestFile.json();
	logQuizData(quizTestFile);
	quizRender(quizTestFile);
	draw();	// start running renderer
}
catch(error) {
	console.warn(error.message);
}

