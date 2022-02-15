"use strict";

// load animation pages
import {titleAnimation} from "../src/title.js"; // title animation
import {menuAnimation} from "../src/menu.js"; // menu animation
import {editorAnimation} from "../src/editor.js"; // editor animation
import {gameAnimation} from "../src/game.js"; // game animation
import {answerAnimation} from "../src/questionAnswer.js"; // answer animation
import {resultAnimation} from "../src/result.js"; // result animation
import {transitionSet} from "../src/transition.js";
import {renderPopup} from "../src/confirmOverlay.js";
import {helpAnimation} from "../src/helpOverlay.js"; // help overlay

// variables
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let currentAnim = titleAnimation;
let callback = undefined;

// functions
const loadAnimation = (x) => {

	if (x == "title") {
		currentAnim = titleAnimation;
	}
	if (x == "menu") {
		currentAnim = menuAnimation;
	}
	if (x == "game") {
		currentAnim = gameAnimation;
	}
	if (x == "answer") {
		currentAnim = answerAnimation;
	}
	if (x == "result") {
		currentAnim = resultAnimation;
	}
	if (x == "editor") {
		currentAnim = editorAnimation;
	}
}

// method
const draw = (step) => {

	// set the canvas size every frame
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// clear canvas before drawing new frame
	context.clearRect(0, 0, canvas.width, canvas.height);

	// check responsiveness
	[callback.state.responsive, callback.state.small] = callback.checkResponsive(canvas);

	// run current page
	currentAnim(canvas, context, callback);

	renderPopup(canvas, context, callback);
	helpAnimation(canvas, context, callback);
	transitionSet(canvas, context, callback);


	// solution for looping per frame correctly:
	// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe

	window.requestAnimationFrame(draw);

}

const setupRender = (x) => {
	callback = x; // quick reference for draw() module
	callback.changePage = function(x) {
		this.state.page = x;
		if (x == "menu") {this.setMusic("idle");}
		else if (x == "title") {this.setMusic("title");}
		else if (x == "result") {this.setMusic("result");}
		else if (x == "game") {this.setMusic("quiz");}
		else if (x == "answer") {this.setMusic();}
		loadAnimation(x);
	}
	draw();
}

export {setupRender};