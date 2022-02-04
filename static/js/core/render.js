"use strict";

// load APIs
import {udim, udim2} from "../api/udim.js"
import {checkResponsive} from "../api/responsive.js";

// load animation pages
import {transitionIn, transitionOut} from "../src/transition.js"; // transition animation
import {titleAnimation} from "../src/title.js"; // title animation
import {menuAnimation} from "../src/menu.js"; // menu animation
import {gameAnimation, setQuiz} from "../src/game.js"; // game animation
import {helpAnimation} from "../src/help.js"
import {editorAnimation} from "../src/editor.js";
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
	[callback.state.responsive, callback.state.small] = checkResponsive(canvas);

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

export {setRender, switchAnim, setQuiz};