/**
 * @author Salsa
 */

// Link in Modules
var mod01 = require('Module01');
var mod02 = require('./Library/Module02');
var mod03 = require('./Public/Module03');

// using exported methods from Mod01
console.log("Adding 4+3 returns: " + mod01.add(4,3));
console.log("Multiplying 4*3 returns: "+ mod01.multiply(4,3));
console.log("Subtracting 4-3 returns: "+ mod01.subtract(4,3));

// using exported method from Mod02
console.log("50 feet in miles is: " + mod02.feetToMiles(50));

// using modular pattern from Mod03, passing in an object with a num value
mod03.myObject.squareRoot({num:16});
