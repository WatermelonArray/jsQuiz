"use strict";


import {udim, udim2} from "./api/udim.js"
import {menuText, startText} from "./src/menu/textRender.js";

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

let hslColor = [0, 20, 50];

function getMouseCords() {

}
function isMouseInsideCords() {

}

function playIntro() {

}

function draw() {

	// set the canvas size every frame
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// set current frame variables
	const cw = canvas.width;
	const ch = canvas.height;
	
	hslColor[0] = hslColor[0] + 0.5;
	if (hslColor[0] > 359) {
		hslColor[0] = 0;
	}

	// create background
	context.clearRect(0, 0, cw, ch);
	context.fillStyle = "hsl(" + hslColor[0] + "," + hslColor[1] + "%," + hslColor[2] + "%)";
	let blackBar = context.fillRect(0, 0, cw, ch);

	context.fillStyle = "#000000"
	context.globalAlpha = 0.75;
	context.fillRect(0, (ch/2) - (64*1.5), cw, ch/6);

	menuText(canvas, context);

	startText(canvas, context);

	// solution found for looping correctly:
	// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
	window.requestAnimationFrame(draw);
}

export {draw};