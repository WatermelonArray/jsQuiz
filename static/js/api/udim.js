"use strict";

// this is a custom api for helping me position and scale elements on a canvas using UDIM principals

class udim {
	constructor(s, o) {
		this.scale = s || 0;
		this.offset = o || 0;

		if ((s || o) && !(s && o)) {
			console.warn("Use initialize with scale and offset values to create \"udim\" class");
		}
	}
}

class udim2 {
	constructor(x1, x2, y1, y2) {
		this.x = new udim(x1, x2);
		this.y = new udim(y1, y2);

		if (!(x1 && x2 && y1 && y2)) {
			console.warn("Please use x1, x2, y1, y2 values to create \"udim2\" class");
		}
	}
}

const api_udim = udim
const api_udim2 = udim2

export {api_udim, api_udim2};