/**
 * @author Chelsa
 */

function myObject(){
	//button that calls foo function
	$("#button01").click(foo);

	// put document ready code in here
	$("#paragraph01").html("This sentence added by jQuery");
	
	// only want one object in the code so you put the function into the main object
	function foo(){
		console.log("foo");
		$("#paragraph02").html("This sentence added by jQuery button");
	}
	
	// call the object/function to write to the console
	//foo();
	
}

$(document).ready(function() { 
	myObject();
});