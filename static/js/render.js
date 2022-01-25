"use strict";


import {udim, udim2} from "./api/udim.js"
import {handleKeyboard} from "./inputHandler.js";
import {transitionIn, transitionOut} from "./src/transition.js";		// transition animation
import {menuAnimation} from "./src/menu.js";			// main menu animation
import {levelSelectAnimation} from "./src/levelSelect.js";			// level select animation

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
var currentAnim = menuAnimation;

function switchAnim(x) {
	if (x == "menuAnimation") {
		currentAnim = menuAnimation;
	}
	if (x == "menuTransitionOut") {
		currentAnim = [menuAnimation, [transitionIn, "levelSelectIn"]];
	}
	if (x == "levelSelectIn") {
		currentAnim =[levelSelectAnimation, transitionOut]
	}
}

handleKeyboard(switchAnim)

function draw() {
	
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

export {draw};