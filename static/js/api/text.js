"use strict";

// variables
const sizes = {
	"1": 72,
	"2": 64,
	"3": 32,
	"4": 24,
	"5": 16,
	"6": 12,
	"7": 11,
	"8": 10,
	"9": 6
}

const colors = {
	white: "#eeeeee",
	dark: "#222222"
}

const fonts = {
	normal: "Noto Sans Display",
	light: "Noto Sans Display",
	mono: "Roboto Mono"
}

const api_setText = (context, cw, options) => {

	context.globalAlpha = options.alpha || 1;
	context.textAlign = options.align || "center";
	context.textBaseline = options.baseline || "middle";
	context.fillStyle = colors[options.color] || colors.white;

	let maxSize = options.size || 1;

	while (maxSize < 9) {

		context.font = sizes[maxSize] + "px " + fonts[options.font || fonts.normal];
		if (options.font == "light") {context.font = "300 " + context.font}
	
		if (context.measureText(options.text).width > (cw / 12 * 10)) {maxSize++;}
		else {break}
	}
}

export {api_setText};