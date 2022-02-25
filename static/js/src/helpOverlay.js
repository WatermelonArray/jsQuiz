"use strict";

// Animation rendering
const background = (context, callback, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "#eeeeee";
	context.shadowBlur = "16";
	context.shadowColor = "rgba(0, 0, 0, 0.4)";

	if (callback.state.responsive) {context.fillRect(0, 0, cw, ch);}
	else {
		context.fillRect(
			ch / 12,
			ch / 12,
			cw - (ch / 12 * 2),
			ch - (ch / 12 * 2)
		);
	}
	context.shadowBlur = 0;
}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];
	let options = {
		font: "mono",
		color: "white",
		size: 2,
		text: "Back"
	};

	// back
	context.fillStyle = "#222222";
	context.fillRect(
		cw / 6 * 2,
		ch / 12 * 9.5,
		cw / 6 * 2,
		ch / 12
	);

	callback.setText(context, cw / 6 * 1.5, options);
	context.fillText("Back", cw / 2, ch / 12 * 10);

	buttonLocations.push({
		loc: {
			x0: cw / 6 * 2,
			x1: (cw / 6 * 2) + (cw / 6 * 2),
			y0: ch / 12 * 9.5,
			y1: (ch / 12 * 9.5) + (ch / 12)
		},
		ref: "helpClose"
	});

	callback.state.helpButtons = buttonLocations;

}

const mainText = (context, callback, cw, ch) => {
	
	let options = {
		font: "light",
		color: "dark",
		size: 2,
		text: "Help"
	};

	callback.setText(context, cw / 6 * 2, options);

	if (callback.state.responsive) {context.fillText("Help", cw / 2, ch / 12);}
	else {context.fillText("Help", cw / 2, ch / 12 * 2);}
}

const helpText = (context, callback, cw, ch) => {

	const h1 = "Use \"Quiz\" mode to play the JS quiz game.";
	const h2 = "Use \"Custom\" to make your own quiz.";
	const h3 = "You can also import a quiz from this option!";
	const h4 = "You can answer questions by click/tapping the answer.";
	const h5 = "You can always go back home by pressing back on the game.";
	const h6 = "Credits:";
	const h7 = "Made by Lucas (WatermelonArray) https://watermelonarray.github.io";
	const h8 = "Music by babasmasmoosic: https://soundcloud.com/babasmasmoosic";
	const h9 = "Tracks used: Space Journey & A Turtle's Adventures - The Begininng";

	let options = {
		font: "normal",
		color: "dark",
		size: 3,
		align: "left",
		text: h9
	};

	callback.setText(context, cw / 12 * 10, options);

	context.fillText(h1, cw / 12 * 1.5, ch / 12 * 3);
	context.fillText(h2, cw / 12 * 1.5, ch / 12 * 3.5);
	context.fillText(h3, cw / 12 * 1.5, ch / 12 * 4);
	context.fillText(h4, cw / 12 * 1.5, ch / 12 * 4.5);
	context.fillText(h5, cw / 12 * 1.5, ch / 12 * 5);
	context.fillText(h6, cw / 12 * 1.5, ch / 12 * 6);
	context.fillText(h7, cw / 12 * 1.5, ch / 12 * 6.5);
	context.fillText(h8, cw / 12 * 1.5, ch / 12 * 7);
	context.fillText(h9, cw / 12 * 1.5, ch / 12 * 7.5);
}

// Method
const helpAnimation = (canvas, context, callback) => {
	if (callback.state.helpPopup) {
		const cw = canvas.width;
		const ch = canvas.height;

		background(context, callback, cw, ch);
		buttons(context, callback, cw, ch);
		mainText(context, callback, cw, ch);
		helpText(context, callback, cw, ch);
	}
}

// Export
export {helpAnimation};