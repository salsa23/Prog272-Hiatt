/**
 * @author Chelsa Hiatt
 * 
 * Subscriber Module - Calculator: add, subtract and multiply 2 numbers
 */

var MyCalc = {};

MyCalc.Calculator = (function() {

	// Constructor
	function Calculator() {
		$.subscribe('add', add);
		$.subscribe('multiply', multiply);
		$.subscribe('subtract', subtract);
	}

	function add(event, userData) {
		userData.results = parseInt(userData.num01) + parseInt(userData.num02);
		//$("#results").html("<h3>The results: " + userData.results + "</h3>");
		$.publish('results', userData);
	}

	function multiply(event, userData) {
		userData.results = parseInt(userData.num01) * parseInt(userData.num02);
		//$("#results").html("<h3>The results: " + userData.results + "</h3>");
		$.publish('results', userData);
	}

	function subtract(event, userData) {
		userData.results = parseInt(userData.num01) - parseInt(userData.num02);
		//$("#results").html("<h3>The results: " + userData.results + "</h3>");
		$.publish('results', userData);
	}

	return Calculator;

}());