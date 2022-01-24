"use strict";


import {udim, udim2} from "./api/udim.js"
import {menuBackground, menuBar, menuText, startText} from "./src/menu.js";			// main menu animation

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

function getMouseCords() {

}
function isMouseInsideCords() {

}

function draw() {

	// set the canvas size every frame
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// create background
	menuBackground(canvas, context);
	menuBar(canvas, context);
	menuText(canvas, context);
	startText(canvas, context);

	// solution found for looping correctly:
	// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
	window.requestAnimationFrame(draw);
}

export {draw};