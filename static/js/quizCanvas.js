"use strict";


import {udim, udim2} from "./api/udim.js"

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
	
	// set current frame variables
	const cw = canvas.width;
	const ch = canvas.height;

	// create background
	context.clearRect(0, 0, cw, ch);
	context.fillStyle = "#222222";
	context.fillRect(0, 0, cw, ch);

	context.font = "64px Georgia";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center"
	context.fillText("Hello World!", cw/2, ch/2)

	

	// solution found for looping correctly:
	// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
	window.requestAnimationFrame(draw)
}

export {draw};