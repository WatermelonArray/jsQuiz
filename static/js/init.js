"use strict";

// for future reference: https://softwareengineering.stackexchange.com/questions/119181/what-type-of-encoding-can-i-use-to-make-a-string-shorter
//import {questionAnswer, questionTemplate} from "./jsonClass.js";			// for compiling to json (custom quizes in the future)

// setup core modules
import {setLogic} from "./core/logic.js";										// the logic for handling quiz logic
import {draw, setRender, switchAnim, setQuiz} from "./core/render.js";			// the renderer for the game
import {setupInput} from "./core/inputHandler.js";								// input handling for the game

// debug module
import {logQuizData} from "./core/debugger.js"; 								// only for debugging purposes

// variables


// setup functions
const callback = {

	currentState: {
		// page data
		currentPage: "title",
		allowInput: true,
		transition: false,
		allowSkip: true,
		sound: true,
	
		// quiz data
		quizCurrent: undefined,
		score: 0,
		buttons: []
	},

	addScore: function() {this.currentState.score++;},
	changePage: function(x) {this.currentState.currentPage = x; switchAnim(x);}
}

/*}(type, x) => {

	if (type == "check") {
		return currentState;
	}
	else if (type == "changePage") {currentState.currentPage = x, switchAnim(currentState.currentPage)}
	else if (type == "changeInput") {currentState.allowInput = x;}
	else if (type == "changeTansition") {currentState.transition = x;}
	else if (type == "changeSkip") {currentState.allowSkip = x;}

	else if (type == "getButtons") {return currentState.buttons};
}*/



// start game

setupInput(callback);
setRender(callback);

//try {
	// grab testing quiz
	// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	// https://developer.mozilla.org/en-US/docs/Web/API/Request/json

	let x = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
	//console.log(x)
	callback.currentState.quizCurrent = await x.json();

	console.log(callback)

	logQuizData(callback);
	setQuiz(callback);
	draw(callback);	// start running renderer
/*}
catch(error) {
	console.error(error.message);
}*/

