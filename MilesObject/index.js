/**
 * @author chelsa.hiatt
 */

/* jshint strict: true */

Console.log("It works");

var milesConvert = {
	miles: 3,
	feetPerMile:5280,
	milesToFeet: function(){
		'use strict';
		return this.miles * this.feetPerMile;
	}
};

Console.log('Miles in feet ' + milesConvert.milesToFeet());
