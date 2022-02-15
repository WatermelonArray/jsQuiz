"use strict";

// for future reference: https://softwareengineering.stackexchange.com/questions/119181/what-type-of-encoding-can-i-use-to-make-a-string-shorter
//import {questionAnswer, questionTemplate} from "./jsonClass.js"; // for compiling to json (custom quizes in the future)

// fetch core modules
import {setupLogic} from "./core/logic.js"; // the logic for handling quiz logic
import {setupRender} from "./core/render.js"; // the renderer for the game
import {setupInput} from "./core/inputHandler.js"; // input handling for the game
import {setupAudio} from "./core/audio.js"; // audio system for the game

// debug module
import {logQuizData} from "./core/debugger.js"; // only for debugging purposes

// fetch API
import {api_checkResponsive} from "./api/responsive.js";
import {api_setText} from "./api/text.js";
import {api_udim, api_udim2} from "./api/udim.js";
import {api_lerp} from "./api/lerp.js"

// setup callback
const callback = {
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

		// editor data
		

		// popups
		confirmPopup: false,
		helpPopup: false
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
}

// setup api
callback.setText = api_setText;
callback.checkResponsive = api_checkResponsive;
callback.lerp = api_lerp;
callback.enum.udim = api_udim;
callback.enum.udim2 = api_udim2;

// fetch quiz json
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/json
let x = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
callback.state.quiz = await x.json();

// start game
init(callback);
callback.setMusic("title");