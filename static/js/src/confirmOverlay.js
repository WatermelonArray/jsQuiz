"use strict";

const popupBackground = (context, cw, ch) => {

	context.globalAlpha = 1;
	context.fillStyle = "#eeeeee";
	context.shadowBlur = "16";
	context.shadowColor = "rgba(0, 0, 0, 0.4)";
	context.fillRect(
		cw / 4,
		ch / 3,
		cw / 2,
		ch / 3
	);
	context.shadowBlur = 0;
}

const buttons = (context, callback, cw, ch) => {

	let buttonLocations = [];
	let options = {
		font: "normal",
		color: "white",
		size: 3,
		text: "Yes"
	};

	context.fillStyle = "#6e9632";

	if (callback.state.responsive) {
		context.fillRect(
			cw / 6 * 1.65,
			ch / 6 * 3,
			cw / 6 * 2.7,
			ch / 12 * 0.8
		);
		context.fillRect(
			cw / 6 * 1.65,
			ch / 6 * 3.5,
			cw / 6 * 2.7,
			ch / 12 * 0.8
		);

		callback.setText(context, cw / 6 * 2.5, options);
		context.fillText("Yes", cw / 2, ch / 12 * 6.4);
		context.fillText("No", cw / 2, ch / 12 * 7.4);

		buttonLocations.push({
			loc: {
				x0: cw / 6 * 1.65,
				x1: (cw / 6 * 1.65) + (cw / 6 * 2.7),
				y0: (ch / 6 * 3),
				y1: (ch / 6 * 3) + (ch / 12 * 0.8)
			},
			ref: "confirmAccept"
		});
		buttonLocations.push({
			loc: {
				x0: cw / 6 * 1.65,
				x1: (cw / 6 * 1.65) + (cw / 6 * 2.7),
				y0: (ch / 6 * 3.5),
				y1: (ch / 6 * 3.5) + (ch / 12 * 0.8)
			},
			ref: "confirmClose"
		});
	}
	else {
		context.fillRect(
			cw / 12 * 3.5,
			ch / 12 * 6,
			cw / 12 * 2,
			ch / 12 * 1.5
		);
		context.fillRect(
			cw / 12 * 6.5,
			ch / 12 * 6,
			cw / 12 * 2,
			ch / 12 * 1.5
		);

		callback.setText(context, cw / 6 * 1.8, options);
		context.fillText("Yes", cw / 12 * 4.5, ch / 12 * 6.75);
		context.fillText("No", cw / 12 * 7.5, ch / 12 * 6.75);

		buttonLocations.push({
			loc: {
				x0: cw / 12 * 3.5,
				x1: (cw / 12 * 3.5) + (cw / 12 * 2),
				y0: (ch / 12 * 6),
				y1: (ch / 12 * 6) + (ch / 12 * 1.5)
			},
			ref: "confirmAccept"
		});
		buttonLocations.push({
			loc: {
				x0: cw / 12 * 6.5,
				x1: (cw / 12 * 6.5) + (cw / 12 * 2),
				y0: (ch / 12 * 6),
				y1: (ch / 12 * 6) + (ch / 12 * 1.5)
			},
			ref: "confirmClose"
		});
	}

	callback.state.confirmButtons = buttonLocations;
}

const text = (context, callback, cw, ch) => {

	let options = {
		font: "light",
		color: "dark",
		size: 1,
		text: "Are you sure?"
	};

	callback.setText(context, cw / 3 * 1.5, options);
	context.fillText("Are you sure?", cw / 2, ch / 12 * 5);

}
// method
const renderPopup = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	if (callback.state.confirmPopup) {
		popupBackground(context, cw, ch);
		buttons(context, callback, cw, ch);
		text(context, callback, cw, ch);
	}
}

// export
export {renderPopup};