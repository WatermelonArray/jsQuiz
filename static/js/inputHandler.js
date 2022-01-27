"use strict";


function getMouseCords() {

}
function isMouseInsideCords() {

}

let y = 0
function handleKeyboard(switchAnim) {
	document.addEventListener("keydown", function(input) {
		if (input.key == "Enter") {
			if (y == 0) {switchAnim("menu");}
			if (y == 1) {switchAnim("game");}

			y++;
		}
	})
}

export {handleKeyboard};