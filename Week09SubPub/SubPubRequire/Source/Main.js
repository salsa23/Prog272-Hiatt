/**
 * @author Chelsa Hiatt
 * Main to pull in jquery, and messenger
 */

require.config({
	// config to set default paths of required JS files
	paths: {
		//"jquery": "http://code.jquery.com/jquery-1.11.0.min",
		"jquery": "jquery",
		"messenger": "Messenger"    
  }
});

// modules with defined 'describe' areas - put jquery here as well
require(["jquery","Calculate", "CalculateUI"], function(j, calc, calcUI) {
	console.log("Main called.");
	calc.calculator();
	calcUI.calculatorUI();
});