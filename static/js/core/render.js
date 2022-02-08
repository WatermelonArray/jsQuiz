"use strict";

// load animation pages
//import {transitionIn, transitionOut} from "../src/transition.js"; // transition animation
import {titleAnimation} from "../src/title.js"; // title animation
import {menuAnimation} from "../src/menu.js"; // menu animation
import {helpAnimation} from "../src/help.js" // help animation
import {editorAnimation} from "../src/editor.js"; // editor animation
import {gameAnimation} from "../src/game.js"; // game animation
import {answerAnimation} from "../src/questionAnswer.js"; // answer animation
import {resultAnimation} from "../src/result.js"; // result animation

// variables
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let currentAnim = titleAnimation;
let callback = undefined;

// functions
const switchAnim = (x) => {

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
	if (x == "help") {
		currentAnim = helpAnimation;
	}
	if (x == "editor") {
		currentAnim = editorAnimation;
	}

	if (x == "menuTransitionOut") {
		currentAnim = [menuAnimation, [transitionIn, "levelSelectIn"]];
	}
	if (x == "levelSelectIn") {
		currentAnim = [gameAnimation, transitionOut]
	}

}


const draw = () => {
	
	// set the canvas size every frame
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	// clear canvas before drawing new frame
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// check responsiveness
	[callback.state.responsive, callback.state.small] = callback.checkResponsive(canvas);

	//console.log(callback.state.responsive)
	// run current page
	currentAnim(canvas, context, callback);
	
	/* if (Array.isArray(currentAnim)) {
		for (let i = 0; i < currentAnim.length; i++) {
			//console.log(currentAnim[i])
			if (Array.isArray(currentAnim[i])) {
				currentAnim[i][0](canvas, context, switchAnim, currentAnim[i][1]);
			}
			else {
				currentAnim[i](canvas, context);
			}
		}
	}
	else {
		currentAnim(canvas, context, callbackFunc, checkResponsive);
	} */
	
	// solution for looping per frame correctly:
	// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe

	window.requestAnimationFrame(draw);

}

const setRender = (x) => {callback = x; draw();}

export {setRender, switchAnim};