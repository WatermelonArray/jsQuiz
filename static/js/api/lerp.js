"use strict";

const api_lerp = (t, a, b) => {return ((1 - t) * a) + (t * b);} // standard linear interpolation

export {api_lerp};