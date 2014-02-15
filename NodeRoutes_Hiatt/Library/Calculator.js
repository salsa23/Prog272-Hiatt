/**
 * @author Chelsa Hiatt
 * 
 * calculator: how many feet are in 'X' miles, as well as circumference of a circle given radius
 */

var MyObject = (function() {

	// Private Data
	var feetPerMile = 5280;

	// Constructor
	function MyObject() {
		console.log("MyObject.Constructor called");
	}

	MyObject.prototype.getXFeet = function(userMile) {
		console.log("MyObject.getXFeet called");
		var retVal= userMiles*feetPerMile;
		console.log("user sent Miles: " + userMile);
		return retVal;
	};	

	MyObject.prototype.getCirc = function(radius) {
		console.log("MyObject.getCirc called");
		var retVal= 2 * radius * Math.PI;
		console.log("user passed a radius of: " + radius);
		return retVal;
	};	

	return MyObject;

}());

exports.myObject = new MyObject();