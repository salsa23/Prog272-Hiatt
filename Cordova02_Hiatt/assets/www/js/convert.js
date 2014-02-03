/**
 * @author Chelsa Hiatt
 */

function myConverter() {'use strict';
	//button that calls degreeConvertPrivate function
	$("#celcius").click(degreeConvertPrivate);
	//button that calls milesConvertPrivate function
	$("#kilometers").click(milesConvertPrivate);
	//button that calls numberConvertPrivate function
	$("#squareRoot").click(numberConvertPrivate);

	var degrees = 0;
	var miles = 0;
	var number = 0;

	var that = this;

	// private function to set user values and button click
	function degreeConvertPrivate() {'use strict';
		console.log("degreeConvertPrivate was called");

		// set user values in object
		var degrees = parseInt(document.getElementById("fahrenheit").value);

		// call the convert function
		var cel = that.degreeConvert(degrees);

		// update HTML file with conversion
		$("#degreesConverted").html(cel);
	};

	// function to convert fahrenheit to celcuius
	this.degreeConvert = function(degrees) {'use strict';
		console.log("degreeConvert was called");

		// Calc for celcius = Deduct 32, then multiply by 5, then divide by 9
		var cel = ((degrees - 32) * 5) / 9;

		return cel;
	};

	// private function to set user values and button click
	function milesConvertPrivate() {'use strict';
		console.log("milesConvertPrivate was called");
		
		// set user values in object
		var miles = parseInt(document.getElementById("miles").value);

		// call the convert function
		var km = that.milesConvert(miles);

		// update HTML file with conversion
		$("#milesConverted").html(km);
	};

	// function to convert miles to kilometers
	this.milesConvert = function(miles) {'use strict';
		console.log("milesConvert was called");

		// kilometers calc =  miles/0.62137
		var km = (miles / 0.62137);

		// return to app
		return km;
	};

	// private function to set user values when button clicked
	function numberConvertPrivate() {'use strict';
		console.log("numberConvertPrivate was called");

		// set user values in object
		var number = parseInt(document.getElementById("number").value);

		// call the convert function
		var sq = that.numberConvert(number);

		// update HTML file with conversion
		$("#numberConverted").html(sq);
	};

	// function to convert user number to sq root value
	this.numberConvert = function(number) {'use strict';
		console.log("numberConvert was called");

		// math to sq root
		var sq = Math.sqrt(number);

		// return to app
		return sq;

	};
};


$(document).ready(function() {'use strict';
	new myConverter();
});
