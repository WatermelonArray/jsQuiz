"use strict";

// functions
const checkMouseOver = (vec2, arr) => {

	for (let i = 0; i < arr.length; i++) {

		let x0 = arr[i].x0 // start x
		let x1 = arr[i].x1 // end x
		let y0 = arr[i].y0 // start y
		let y1 = arr[i].y1 // end y

			   // x start         x end           y start         y end
		return vec2.x >= x0 && vec2.x <= x1 && vec2.y >= y0 && vec2.y <= y1;
	}
}

const handleInput = (input, aArgs) => {

	const page = aArgs("check").currentPage

	if (input == "forward") {
		if (page == "title") {
			aArgs("changePage", "menu");
		}
		else if(page == "menu") {
			aArgs("changePage", "game");
		}
	}
	else if (input == "back") {
		if (page == "menu") {
			aArgs("changePage", "title");
		}
		else if(page == "game") {
			aArgs("changePage", "menu");
		}
	}
	else if (input == "click") {}
	else if (input == "help") {}
}

// events
const mouse = (gameState, switchAnim) => {

	let x = 0;
	let y = 0;

	document.addEventListener("mousemove", function(input) {
		
		x = input.clientX;
		y = input.clientY;
		//console.log(input.clientX + ", " + input.clientY)

	})

	document.addEventListener("mousedown", function(input) {

		//console.log(input.button)
		if (input.button == 0) {
			console.log(checkMouseOver(
				{x: x, y: y},
				[
					{x0: 100, x1: 300, y0: 400, y1: 800}
				]
			))
		}
	})


}

const keyboard = (gameState, switchAnim) => {
	document.addEventListener("keydown", function(input) {
		if (input.key == "Enter") {handleInput("forward", gameState)}
		if (input.key == "Backspace") {handleInput("back", gameState)}
	})
}

// method
const setupInput = (state, func) => {

	mouse(state, func);
	keyboard(state, func);
}

// export
export {setupInput};