"use strict";

let currentTextBox;

const api_textbox = (callback) => {

	if (currentTextBox) {
		callback.state.allowInput = true;
		currentTextBox.focus();
	}
	else {
		var input = document.createElement("input");
		input.type = "text";
		input.style.position = "fixed"
		input.style.left = "-100%";
		input.style.top = "-100%";
		document.body.appendChild(input);
		currentTextBox = input;

		currentTextBox.onblur = function() {if (!callback.state.allowInput) {setTimeout(function() {currentTextBox.focus()}, 0);}};
		currentTextBox.onkeydown = function(e) {
			if (e.key === "Enter") {
				callback.state.allowInput = true;
				currentTextBox.blur();
				console.log(currentTextBox.value)
			}
		};
		// workaround to delay focus so that it waits for textbox to catch up?
		setTimeout(function() {
			currentTextBox.focus();
			callback.state.allowInput = false;
		}, 0);

	}
}

export {api_textbox};