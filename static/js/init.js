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

		answerPopup: false,
		textboxPopup: false
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
}

// setup api
callback.setText = api_setText;
callback.checkResponsive = api_checkResponsive;
callback.lerp = api_lerp;
callback.textboxInput = api_textbox;

// fetch quiz json
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/json
let x = await fetch("static/quizes/test.json", {method: "GET", mode: "cors"});
callback.state.quiz = await x.json();

// start game

init(callback);
callback.setMusic("title");

//console.log(btoa(JSON.stringify(callback.state.quiz)));
//console.log(JSON.parse(atob("eyJxdWl6TmFtZSI6IlF1aXpUZW1wbGF0ZSIsInF1ZXN0aW9ucyI6eyIxIjp7InF1ZXN0aW9uIjoiV2hhdCBkb2VzIFwiSlNcIiBtZWFuPyIsImFuc3dlcnMiOlt7ImRlc2NyaXB0aW9uIjoiSmF2YVNjcmlwdCIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiSm92YVNjcmlwdCIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6IkphamFTY3JpcHQiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJKdWFTY3JpcHQiLCJpc0Fuc3dlciI6ZmFsc2V9XX0sIjIiOnsicXVlc3Rpb24iOiJJcyBKYXZhU2NyaXB0IGJyb3dzZXIgY29tcGF0aWJsZT8iLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IlllcyIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiTm8iLCJpc0Fuc3dlciI6ZmFsc2V9XX0sIjMiOnsicXVlc3Rpb24iOiJKYXZhU2NyaXB0IGZpbGUgZXh0ZW50aW9ucyBlbmQgaW4gLi4uPyIsImFuc3dlcnMiOlt7ImRlc2NyaXB0aW9uIjoiLmphdmEiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiIuamF2YXNjcmlwdCIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6Ii5qcyIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiLmoiLCJpc0Fuc3dlciI6ZmFsc2V9XX0sIjQiOnsicXVlc3Rpb24iOiJXaGljaCBFQ01BU2NyaXB0IHZlcnNpb24gYW5kIG9ud2FyZHMsIHN0b3BwZWQgc3VwcG9ydGluZyBJRTExPyIsImFuc3dlcnMiOlt7ImRlc2NyaXB0aW9uIjoiRVM4IiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiRVM1IiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiRVM3IiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiRVM2IiwiaXNBbnN3ZXIiOnRydWV9XX0sIjUiOnsicXVlc3Rpb24iOiJXaGljaCBIVE1MIHRhZ3MgZG8gd2UgdXNlIHRvIHJ1biBKYXZhU2NyaXB0IGNvZGU/IiwiYW5zd2VycyI6W3siZGVzY3JpcHRpb24iOiI8c2NyaXB0PiIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiPGphdmFzY3JpcHQ+IiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiPHNvdXJjZT4iLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiI8Y29kZT4iLCJpc0Fuc3dlciI6ZmFsc2V9XX0sIjYiOnsicXVlc3Rpb24iOiJXaGljaCBldmVudCBmaXJlcyB3aGVuIHlvdSBjbGljayBhIGJ1dHRvbj8iLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IkNsaWNrZWQoKSIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6Ik9uY2xpY2soKSIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiTW91c2VidXR0b24xZG93bigpIiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiTW91c2VjbGljaygpIiwiaXNBbnN3ZXIiOmZhbHNlfV19LCI3Ijp7InF1ZXN0aW9uIjoiR2V0TW9udGgoKSByZXR1cm5zIHRoZSBtb250aCBhcz8iLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6ImNoYXIiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJmbG9hdCIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6InN0cmluZyIsImlzQW5zd2VyIjpmYWxzZX0seyJkZXNjcmlwdGlvbiI6ImludCIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiYm9vbCIsImlzQW5zd2VyIjpmYWxzZX1dfSwiOCI6eyJxdWVzdGlvbiI6IkhvdyBkb2VzIEphdmFzY3JpcHQgY29tcGlsZT8iLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IkFoZWFkIG9mIHRpbWUiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJKdXN0IGluIHRpbWUiLCJpc0Fuc3dlciI6dHJ1ZX0seyJkZXNjcmlwdGlvbiI6IkJlZm9yZSBvZiB0aW1lIiwiaXNBbnN3ZXIiOmZhbHNlfV19LCI5Ijp7InF1ZXN0aW9uIjoiV2hhdCBpcyB0aGUgRE9NPyIsImFuc3dlcnMiOlt7ImRlc2NyaXB0aW9uIjoiRGF0YSBPYmplY3QgTW9kZWwiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJEYXRhIE9yaWVudGVkIE1vZGVsIiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiRG9jdW1lbnQgT2JqZWN0IE1vZGVsIiwiaXNBbnN3ZXIiOnRydWV9LHsiZGVzY3JpcHRpb24iOiJEaXNrIG9uIE1vZHVsZSIsImlzQW5zd2VyIjpmYWxzZX1dfSwiMTAiOnsicXVlc3Rpb24iOiJXaGF0IGlzIHRoZSBzeW50YXggZm9yIGFuIG9iamVjdD8iLCJhbnN3ZXJzIjpbeyJkZXNjcmlwdGlvbiI6IltdIiwiaXNBbnN3ZXIiOmZhbHNlfSx7ImRlc2NyaXB0aW9uIjoiKCkiLCJpc0Fuc3dlciI6ZmFsc2V9LHsiZGVzY3JpcHRpb24iOiJ7fSIsImlzQW5zd2VyIjp0cnVlfSx7ImRlc2NyaXB0aW9uIjoiPD4iLCJpc0Fuc3dlciI6ZmFsc2V9XX19fQ==")));