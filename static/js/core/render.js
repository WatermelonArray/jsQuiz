"use strict";

// load core
import {handleKeyboard} from "../core/inputHandler.js";

// load APIs
import {udim, udim2} from "../api/udim.js"
import { checkResponsive } from "../api/responsive.js";

// load animation pages
import {transitionIn, transitionOut} from "../src/transition.js";		// transition animation
import {titleAnimation} from "../src/title.js";							// title animation
import {menuAnimation} from "../src/menu.js";							// menu animation
import {gameAnimation, setQuiz} from "../src/game.js";					// game animation


let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let currentAnim = titleAnimation;

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

	if (x == "menuTransitionOut") {
		currentAnim = [menuAnimation, [transitionIn, "levelSelectIn"]];
	}
	if (x == "levelSelectIn") {
		currentAnim = [gameAnimation, transitionOut]
	}

}

const quizRender = (x) => {setQuiz(x)}

const draw = () => {
	
	// set the canvas size every frame
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	// Clear canvas before drawing new frame
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (Array.isArray(currentAnim)) {
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
		currentAnim(canvas, context);
	}

	// solution for looping per frame correctly:
	// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
	window.requestAnimationFrame(draw);
}

export {draw, switchAnim, quizRender};