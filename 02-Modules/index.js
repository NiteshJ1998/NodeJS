/**
 * In Production we have large codebase so we break down those code
 * to small code called as modules
 */

const math = require("./math");

console.log("Math value is", math.addFn(2, 4));
