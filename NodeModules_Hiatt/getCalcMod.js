/**
 * @author Chelsa Hiatt
 * 
 * Module01: export methods that add, multiply and subtract two whole numbers.
 */

function add(x,y) {
	return x+y;
}

function multiply(x,y) {
	return x*y;
}
function subtract(x,y) { 
	return x-y;
}

// Export the methods from this module so each one can be called from the main program.
exports.add = add;
exports.multiply = multiply;
exports.subtract = subtract;