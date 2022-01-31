"use strict";

// for future reference: https://softwareengineering.stackexchange.com/questions/119181/what-type-of-encoding-can-i-use-to-make-a-string-shorter
//import {questionAnswer, questionTemplate} from "./jsonClass.js";			// for compiling to json (custom quizes in the future)

// setup core modules
import {setLogic} from "./core/logic.js";										// the logic for handling quiz logic
import {setRender, switchAnim, setQuiz} from "./core/render.js";			// the renderer for the game
import {setupInput} from "./core/inputHandler.js";								// input handling for the game

// debug module
import {logQuizData} from "./core/debugger.js"; 								// only for debugging purposes

// variables


// setup callback
const callback = {

	state: {
		// page data
		page: "title",
		allowInput: true,
		transition: false,
		allowAnswer: true,
		sound: true,
		responsive: true,
		small: false,

		// quiz data
		quiz: undefined,
		questionNumber: 1,
		score: 0,
		answerResponse: 0,		// 0: no answer, 1: wrong answer, 2: right answer
		buttons: [],
		quizbuttons: []
	},
	changePage: function(x) {this.state.page = x; switchAnim(x);}
}

// start game
setLogic(callback);
setupInput(callback);
setRender(callback);

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/json
let x = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
callback.state.quiz = await x.json();

console.log(callback)
logQuizData(callback);
setQuiz(callback);
setRender(callback);	// start running renderer
