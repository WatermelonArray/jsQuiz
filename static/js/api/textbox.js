"use strict";

let currentTextBox;

const api_textbox = (callback) => {

	if (!currentTextBox) {
		var input = document.createElement("input");
		input.type = "text";
		input.style.position = "fixed"
		input.style.left = "-100%";
		input.style.top = "-100%";
		document.body.appendChild(input);

		input.onblur = function() {
			callback.state.allowInput = true;
		};
		input.onkeydown = function(e) {
			if (e.key === "Enter") {
				callback.state.allowInput = true;
				input.blur();
				console.log(currentTextBox.value)
			}
			if (e.key === "Escape") {
				callback.state.allowInput = true;
				input.blur();
			}
		};

		currentTextBox = input;

	}

	// workaround to delay focus so that it waits for textbox to catch up?
	setTimeout(function() {
		currentTextBox.focus();
		callback.state.allowInput = false;
	}, 0);
}

export {api_textbox};