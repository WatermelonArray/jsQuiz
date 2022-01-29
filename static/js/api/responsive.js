"use strict";

// To keep with consistency in web design, I have used the bootstrap responsive class values
const sizes = {
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400
}

const checkResponsive = (cw, ch) => {return cw < ch, cw < sizes.md;}

export {checkResponsive};