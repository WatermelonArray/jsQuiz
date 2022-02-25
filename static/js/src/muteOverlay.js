"use strict";


const muteButton = (context, callback, cw, ch) => {

	let buttonLocations = [];

	let options = {
		font: "mono",
		color: "white",
		size: 4,
		text: "Mute"
	};

	context.globalAlpha = 1;

	if (callback.state.sound) {context.fillStyle = "#44FF44"; options.color = "dark";}
	else {context.fillStyle = "#FF4444"; options.text = "Unmute";}
	context.fillRect(
		0,
		0,
		ch / 12,
		ch / 12
	);

	callback.setText(context, ch / 12, options);
	context.fillText(options.text, ch / 24, ch / 24);

	buttonLocations.push({
		loc: {
			x0: 0,
			x1: ch / 12,
			y0: 0,
			y1: ch / 12
		},
		ref: "mute"
	});

	callback.state.muteButtons = buttonLocations;
}

// method
const muteOverlay = (canvas, context, callback) => {
	const cw = canvas.width;
	const ch = canvas.height;
	muteButton(context, callback, cw, ch);
}

// export
export {muteOverlay};