"use strict";

// functions

// animation rendering
const background = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "rgb(238, 238, 238)";
	context.fillRect(0, 0, cw, ch);

}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];
	let options = {
		font: "normal",
		color: "white",
		size: 2,
		text: "Yes"
	};


	context.globalAlpha = 0.75;
	context.shadowBlur = "16";
	context.shadowColor = "rgba(0, 0, 0, 0.4)";

	// quizes
	context.fillStyle = "#FF0000";
	if (callback.state.responsive) {
		context.fillRect(
			cw / 6,
			ch / 6 * 1.5,
			cw / 6 * 4,
			ch / 6
		)
	}
	else {
		context.fillRect(
			cw / 6,
			ch / 6,
			cw / 12 * 3.75,
			ch / 12 * 5
		)
	}

	// custom
	context.fillStyle = "#00FF00";
	if (callback.state.responsive) {
		context.fillRect(
			cw / 6,
			ch / 6 * 3,
			cw / 6 * 4,
			ch / 6
		)
	}
	else {
		context.fillRect(
			cw / 12 * 6.25,
			ch / 6,
			cw / 12 * 3.75,
			ch / 12 * 5
		)
	}

	// help
	context.fillStyle = "#0000FF";
	if (callback.state.responsive) {
		context.fillRect(
			cw / 6,
			ch / 6 * 4.5,
			cw / 6 * 4,
			ch / 6
		)
	}
	else {
		context.fillRect(
			cw / 6,
			ch / 12 * 7.5,
			cw / 6 * 4,
			ch / 12 * 2.5
		)
	}
	
	context.shadowBlur = 0;
	
	if (callback.state.responsive) {
		callback.setText(context, cw / 6 * 3.5, options);

		context.fillText("Quizes", cw / 2, ch / 6 * 2);
		context.fillText("Custom", cw / 2, ch / 6 * 3.5);
		context.fillText("Help", cw / 2, ch / 6 * 5);

		buttonLocations.push({ // quiz
			loc: {
				x0: cw / 6,
				x1: (cw / 6) + (cw / 6 * 4),
				y0: ch / 6 * 1.5,
				y1: (ch / 6 * 1.5) + (ch / 6)
			},
			ref: "nextQuestion"
		});
		buttonLocations.push({ // editor
			loc: {
				x0: cw / 6,
				x1: (cw / 6) + (cw / 6 * 4),
				y0: ch / 6 * 3,
				y1: (ch / 6 * 3) + (ch / 6)
			},
			ref: "editor"
		})
		buttonLocations.push({ // help
			loc: {
				x0: cw / 6,
				x1: (cw / 6) + (cw / 6 * 4),
				y0: ch / 6 * 4.5,
				y1: (ch / 6 * 4.5) + (ch / 6)
			},
			ref: "help"
		})
	}
	else {
		callback.setText(context, cw / 12 * 3.5, options);
		context.fillText("Quizes", cw / 12 * 3.875, ch / 12 * 4.5);
		context.fillText("Custom", cw / 12 * 8.125, ch / 12 * 4.5);

		callback.setText(context, cw / 6 * 3.5, options);
		context.fillText("Help", cw / 2, ch / 12 * 8.75);

		buttonLocations.push({ // quiz
			loc: {
				x0: cw / 12 * 2,
				x1: (cw / 12 * 2) + (cw / 12 * 3.75),
				y0: (ch / 12 * 2),
				y1: (ch / 12 * 2) + (ch / 12 * 5)
			},
			ref: "nextQuestion"
		})
		buttonLocations.push({ // editor
			loc: {
				x0: cw / 12 * 6.25,
				x1: (cw / 12 * 6.25) + (cw / 12 * 3.75),
				y0: (ch / 12 * 2),
				y1: (ch / 12 * 2) + (ch / 12 * 5)
			},
			ref: "editor"
		})
		buttonLocations.push({ // help
			loc: {
				x0: cw / 6,
				x1: (cw / 6) + (cw / 6 * 4),
				y0: (ch / 12 * 7.5),
				y1: (ch / 12 * 7.5) + (ch / 12 * 2.5)
			},
			ref: "help"
		})
	}

	callback.state.buttons = buttonLocations;

}

const mainText = (context, callback, cw, ch) => {
	
	let options = {
		font: "light",
		color: "dark",
		size: 2,
		text: "Main Menu"
	};

	callback.setText(context, cw / 4 * 3, options)
	if (callback.state.responsive) {
		context.fillText("Main Menu", cw / 2, ch / 12 * 1.5);
	}
	else {
		context.fillText("Main Menu", cw / 2, ch / 12);
	}

}

// method
const menuAnimation = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	background(context, cw, ch);
	buttons(context, callback, cw, ch);
	mainText(context, callback, cw, ch);

}

// export
export {menuAnimation};