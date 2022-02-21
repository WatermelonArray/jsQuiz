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
			callback.editor.textboxPopup = false;
			callback.editor.answerText = input.value;
		};

		input.onkeyup = function(e) {
			if (e.key === "Enter") {
				callback.state.allowInput = true;
				if (callback.editor.textboxSelect === "answer") {
					callback.editor.questionList[callback.editor.currentQuestion - 1].answers[callback.editor.selectedAnswer].description = input.value;
				}
				else if (callback.editor.textboxSelect === "quiz") {
					callback.editor.quizName = input.value;
				}
				else if (callback.editor.textboxSelect === "question") {
					callback.editor.questionList[callback.editor.currentQuestion - 1].question = input.value;
				}
				
				callback.editor.answerPopup = false;
				input.blur();
			}
			else if (e.key === "Escape") {
				callback.state.allowInput = true;
				input.blur();
			}
			else {
				callback.editor.answerText = input.value;
			}
		};

		currentTextBox = input;

	}

	callback.editor.textboxPopup = true;
	if (callback.editor.textboxSelect === "quiz") {
			currentTextBox.value = callback.editor.quizName;
			callback.editor.answerText = currentTextBox.value;
		}
		else if (callback.editor.textboxSelect === "question") {
			currentTextBox.value = callback.editor.questionList[callback.editor.currentQuestion - 1].question;
			callback.editor.answerText = currentTextBox.value;
		}
		else if (callback.editor.textboxSelect === "answer") {
			currentTextBox.value = callback.editor.questionList[callback.editor.currentQuestion - 1].answers[callback.editor.selectedAnswer].description;
			callback.editor.answerText = currentTextBox.value;
		}
	// workaround to delay focus so that it waits for textbox to catch up?
	setTimeout(function() {
		
		currentTextBox.focus();
		callback.state.allowInput = false;
	}, 0);
}

export {api_textbox};