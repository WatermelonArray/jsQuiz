"use strict";

function getMouseCords() {

}
function isMouseInsideCords() {

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

const handleKeyboard = (gameState, switchAnim) => {
	document.addEventListener("keydown", function(input) {
		if (input.key == "Enter") {handleInput("forward", gameState)}
		if (input.key == "Backspace") {handleInput("back", gameState)}
	})
}

export {handleKeyboard};