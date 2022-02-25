"use strict";

// for future reference: https://softwareengineering.stackexchange.com/questions/119181/what-type-of-encoding-can-i-use-to-make-a-string-shorter
//import {questionAnswer, questionTemplate} from "./jsonClass.js"; // for compiling to json (custom quizes in the future)

// fetch core modules
import {setupLogic} from "./core/logic.js"; // the logic for handling quiz logic
import {setupRender} from "./core/render.js"; // the renderer for the game
import {setupInput} from "./core/inputHandler.js"; // input handling for the game
import {setupAudio} from "./core/audio.js"; // audio system for the game
import {setupEditor} from "./core/editor.js"; // editor logic for handling the editor

// debug module
import {logQuizData} from "./core/debugger.js"; // only for debugging purposes

// fetch API
import {api_checkResponsive} from "./api/responsive.js";
import {api_setText} from "./api/text.js";
import {api_lerp} from "./api/lerp.js";
import {api_textbox} from "./api/textbox.js";

// setup callback
const callback = {
	defaultQuiz: undefined,
	state: {
		// page data
		page: "title",
		allowInput: true,
		transition: false,
		allowAnswer: true,
		sound: true,
		transition: "",
		transitionTo: "",
		responsive: true,
		small: false,

		// quiz data
		quiz: undefined,
		questionNumber: 0,
		finish: false,
		score: 0,
		answerResponse: 0, // 0: no answer, 1: wrong answer, 2: right answer
		answerText: "",
		correctAnswer: "",
		answerList: [],
		buttons: [],
		quizbuttons: [],
		confirmButtons: [],
		helpButtons: [],
		muteButtons: [],
		
		// popups
		confirmPopup: false,
		helpPopup: false
	},
	editor: {
		templates: [],
		questionList: [],
		currentQuestion: 1,
		quizName: "quizName",
		answerText: "",
		selectedAnswer: 0,
		textboxSelect: "answer",
		exportSuccess: false,
		playQuizFailed: false,
		exportReason: "",

		answerPopup: false,
		textboxPopup: false,
		exportPopup: false
	},
	resetFuncs: {},
	enum: {}
}

// initialize
const init = (x) => {
	setupLogic(x);
	setupInput(x);
	setupRender(x);
	setupAudio(x);
	setupEditor(x);
};

// setup api
callback.setText = api_setText;
callback.checkResponsive = api_checkResponsive;
callback.lerp = api_lerp;
callback.textboxInput = api_textbox;

// fetch quiz json
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/json
let x = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
let y = x;
x = await x.json();

callback.defaultQuiz = x;
callback.state.quiz = JSON.parse(JSON.stringify(x));

// start game

init(callback);
callback.setMusic("title");