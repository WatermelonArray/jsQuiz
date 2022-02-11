"use strict";

const popupBackground = (context, cw, ch) => {

	context.fillStyle = "#222222";
	context.globalAlpha = 1;
	context.fillRect(
		cw / 4,
		ch / 3,
		cw / 2,
		ch / 3
	);
}

const buttons = (context, callback, cw, ch) => {

	context.fillStyle = "#FF0000";

	if (callback.state.responsive) {
		context.fillRect(
			cw / 6 * 2,
			ch / 6 * 3,
			cw / 6 * 2,
			ch / 12* 0.8
		)
	}
	else {
		context.fillRect(
			cw / 12 * 3.5,
			ch / 12 * 6,
			cw / 12 * 2,
			ch / 12 * 1.5
		)
	}

	if (callback.state.responsive) {
		context.fillRect(
			cw / 6 * 2,
			ch / 6 * 3.5,
			cw / 6 * 2,
			ch / 12 * 0.8
		)
	}
	else {
		context.fillRect(
			cw / 12 * 6.5,
			ch / 12 * 6,
			cw / 12 * 2,
			ch / 12 * 1.5
		)
	}
}

const text = (context, callback, cw, ch) => {

	let options = {
		font: "light",
		color: "white",
		size: 1,
		text: "Are you sure?"
	};

	callback.setText(context, cw / 3 * 2, options);
	context.fillText("Are you sure?", cw / 2, ch / 12 * 5);

}
// method
const renderPopup = (canvas, context, callback) => {

	const cw = canvas.width;
	const ch = canvas.height;

	popupBackground(context, cw, ch);
	buttons(context, callback, cw, ch);
	text(context, callback, cw, ch);

}

// export
export {renderPopup};