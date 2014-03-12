/**
 * @author Chelsa Hiatt
 * 
 * Publisher Module - updated to work with requireJS Main.js file
 */

define(['jquery', 'messenger'], function() {
	// needs jquery and messenger to work
	
	// private variables
	var e = {
			num01 : 0,
			num02 : 0,
			results : 0
		};

	// Constructor
	function calculatorUI() {
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

	return { calculatorUI: calculatorUI };

}());

