/**
 * @author Chelsa Hiatt
 * 
 * Module03 (Modular pattern)
 * Exports a method that takes a single whole number and returns its square.
 */

var ModObj = (function() {

	// Object Private Data
	var number = 0;
	var mySqrt = 0;
	
	// Constructor
	function ModObj() {
		console.log("ModObj.Constructor called");
	}
	// private function that sets the sqRoot of the number within the object.
	function sqRootPrivate(){
		console.log("ModObj.sqRootPrivate was called");
		// does the math on the local number variable to sq root
		mySqrt = Math.sqrt(number);
	}

	ModObj.prototype.squareRoot = function(num) {
		// set the number
		number = num;
		
		// call private method to do the work
		sqRootPrivate();
		
		console.log("Within Mod03 the square root of number: "+ number +" is: " + mySqrt);
		return mySqrt;
	};

	return ModObj;

}());

exports.modObj = new ModObj();