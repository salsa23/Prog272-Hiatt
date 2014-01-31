/**
 * @author Chelsa Hiatt
 */

function myConverter() {
	//button that calls degreeConvert function
	$("#celcius").click(degreeConvert);
	//button that calls milesConvert function
	$("#kilometers").click(milesConvert);
	//button that calls numberConvert function
	$("#squareRoot").click(numberConvert);

	var degrees = 0;
	console.log("degrees in page load: " + degrees);
	var miles = 0;
	console.log("miles in page load: " + miles);
	var number = 0;
	console.log("number in page load: " + number);

	// function to convert fahrenheit to celcuius
	function degreeConvert() {
		console.log("degreeConvert was called");
		console.log("degrees within function prior to convert: " + degrees);
		
		// set user values in object
		degrees = parseInt(document.getElementById("fahrenheit").value);
		console.log("degrees within function USER input: "+degrees);
		
		// Deduct 32, then multiply by 5, then divide by 9
		cel = ((degrees - 32) * 5) / 9;
		console.log("celsius converted: " + cel);
		
		// update HTML file with conversion
		$("#degreesConverted").html(cel);
	}

	// function to convert miles to kilometers
	function milesConvert() {
		console.log("milesConvert was called");
		console.log("miles within function prior to convert: "+miles);

		// set user values in object
		miles = parseInt(document.getElementById("miles").value);
		console.log("miles within function USER input: "+miles);
		
		// kilometers calc =  miles/0.62137
		km = (miles / 0.62137);
		console.log("Kilometers converted: " + km);

		// update HTML file with conversion
		$("#milesConverted").html(km);
	}

	// function to convert user number to sq root value
	function numberConvert() {
		console.log("numberConvert was called");
		console.log("number within function prior to convert: "+number);

		// set user values in object
		number = parseInt(document.getElementById("number").value);
		console.log("number within function USER input: " + number);

		// math to sq root
		sq = Math.sqrt(number);
		console.log("square root of number: " + sq);

		// update HTML file with conversion
		$("#numberConverted").html(sq);
	}

}


$(document).ready(function() {
	myConverter();
}); 