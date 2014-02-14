/**
 * @author Chelsa Hiatt
 * 
 * Module03 use the Modular pattern
 * Exports a method that takes a single whole number and returns its square.
 */

var ModObj = (function(passedObj) {

	// Object Private Data
	console.log("private data updated: "+passedObj.num);
	var number = passedObj.num;
	var mySqrt = 0;
	
	// Constructor
	function ModObj() {
		console.log("ModObj.Constructor called");
		console.log("Constructor setting number to: "+ passedObj.num);
		number = passedObj.num;
		
	}
	function sqRootPrivate(){
		console.log("ModObj.sqRootPrivate was called");
		// does the math on the local number variable to sq root
		mySqrt = Math.sqrt(number);
	}

	ModObj.prototype.squareRoot = function() {
		console.log(sqrt);
	};

	return ModObj;

}());

exports.modObj = new ModObj();