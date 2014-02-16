/**
 * @author Chelsa Hiatt
 * 
 * calculator: how many feet are in 'X' miles, as well as circumference of a circle given radius
 */

var MyCalc = (function() {

	// Private Data
	var feetPerMile = 5280;

	// Constructor
	function MyCalc() {
		console.log("MyCalc.Constructor called");
	}
	
	MyCalc.prototype.getXFeet = function(userMile) {
		console.log("MyCalc.getXFeet called");
		var retVal= userMile*feetPerMile;
		console.log("user sent Miles: " + userMile);
		return retVal;
	};	

	MyCalc.prototype.getCircumference = function(radius) {
		console.log("MyCalc.getCircumference called");
		var retVal= 2 * radius * Math.PI;
		console.log("user passed a radius of: " + radius);
		return retVal;
	};	

	return MyCalc;

}());

exports.myCalc = new MyCalc();