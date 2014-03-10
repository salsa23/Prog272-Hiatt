/**
 * @author Chelsa Hiatt
 * 
 * Publisher Module
 */

MyCalc.CalculatorUI = (function() {
	// private variables
	var e = {
			num01 : 0,
			num02 : 0,
			results : 0
		};

	// Constructor
	function CalculatorUI() {
		console.log("Calc-UI constructor called");
		$("#add").click(addUI);
		$("#multiply").click(multiplyUI);
		$("#subtract").click(subtractUI);
		$.subscribe('results', function(){
			$("#results").html(e.results);
		});
	}

	var addUI = function() {
		e.num01 = $("#number01").val();
		e.num02 = $("#number02").val();
		$.publish('add', e);
	};

	var multiplyUI = function() {
		e.num01 = $("#number01").val();
		e.num02 = $("#number02").val();
		$.publish('multiply', e);
	};

	var subtractUI = function() {
		e.num01 = $("#number01").val();
		e.num02 = $("#number02").val();
		$.publish('subtract', e);
	};

	return CalculatorUI;

}());

$(document).ready(function() {
	// initialize subscriber
	new MyCalc.Calculator();
	// initialize publisher
	new MyCalc.CalculatorUI();
});
