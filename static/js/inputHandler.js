"use strict";


function getMouseCords() {

}
function isMouseInsideCords() {

}

function handleKeyboard(switchAnim) {
	document.addEventListener("keydown", function(input) {
		if (input.key == "Enter") {
			switchAnim("menuTransitionOut")
		}
	})
}

export {handleKeyboard};