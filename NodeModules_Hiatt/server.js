/**
 * @author Chelsa Hiatt
 */

// Link in Modules
var getCalc = require('./getCalcMod');
var getMiles = require('./Library/getMilesMod');
var getSqRoot = require('./Public/getSqRootMod');

//app.use("/", express.static(__dirname + '/'));

// using exported methods from Mod01
console.log("Adding 4+3 returns: " + getCalc.add(4,3));
console.log("Multiplying 4*3 returns: "+ getCalc.multiply(4,3));
console.log("Subtracting 4-3 returns: "+ getCalc.subtract(4,3));

// using exported method from Mod02
console.log("50 feet in miles is: " + getMiles.feetToMiles(50));

// using modular pattern from Mod03, passing in an object with a num value
console.log("From the Server file - the square root of 16 is: " + getSqRoot.modObj.squareRoot(16));
