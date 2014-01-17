/**
 * @author chelsa.hiatt
 */

/* jshint strict: true */

console.log('It works');

var milesConvert = {
	miles: 3,
	feetPerMile:5280,
	milesToFeet: function(miles){
		'use strict';
		return miles * this.feetPerMile;
	}
};

console.log('50 Miles in feet =' + milesConvert.milesToFeet(50));
console.log('24 Miles in feet =' + milesConvert.milesToFeet(24));
console.log('150 Miles in feet =' + milesConvert.milesToFeet(150));