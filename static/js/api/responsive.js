"use strict";

// To keep with consistency in web design, I have used the bootstrap responsive class values
const sizes = {
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400
}

const api_checkResponsive = (canvas) => {return [canvas.width < canvas.height, canvas.width < sizes.md];}

export {api_checkResponsive};