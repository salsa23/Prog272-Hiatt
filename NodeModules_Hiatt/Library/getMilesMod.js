/**
 * @author Chelsa Hiatt
 * 
 * Module02: exports a method that will convert feetToMiles.
 */
function feetToMiles(f) {
	var feetInOneMile = 5280;
	var feet = f;
	var retVal = 0;
	if (feet>0)
	{
		retVal = feet/feetInOneMile;
	}

	return retVal;
}

// Export the methods from this module so each one can be called from the main program.
exports.feetToMiles = feetToMiles;