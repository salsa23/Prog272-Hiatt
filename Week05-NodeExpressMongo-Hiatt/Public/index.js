/**
 * @author Chelsa Hiatt
 */


$(document).ready(function() {
	
	var choice = $("userChoice").val();
	
	// button to select record to display
	$("submit").click({i:choice},getRecord);
	
	//$("submit").click(function(){
		//get user value
	//	var i= $("userChoice").val();	
		// call function with parameter
	//	var result = getRecord(i);
	//});

	// displays one record in the html page from the returned data
	$.getJSON('/read', function(data) {
		// load to html
		$('#name').html('<p>'+data[1].firstName + ' ' + data[1].lastName+'<p>', function(){
			console.log("Name was loaded for object");
		});
		$('#address').html('<p>'+data[1].address+'<p>', function(){
			console.log("Address was loaded for object");
		});
		$("#cityStateZip").html('<p>'+data[1].city + ', '+data[1].state + ' ' + data[1].zip+'<p>', function(){
			console.log("City, State, Zip was loaded for object ");
		});
		
	});
	
	function getRecord(event){
		var i = event.data.i;
		// load to html
		$('#name').html('<p>'+data[i-1].firstName + ' ' + data[i-1].lastName+'<p>', function(){
			console.log("Name was loaded for object");
		});
		$('#address').html('<p>'+data[i-1].address+'<p>', function(){
			console.log("Address was loaded for object");
		});
		$("#cityStateZip").html('<p>'+data[i-1].city + ', '+data[i-1].state + ' ' + data[i-1].zip+'<p>', function(){
			console.log("City, State, Zip was loaded for object ");
		});
		
	}

	$.getJSON('/read', function(data) {
		//console.log(data);
		for (var i = 0; i < data.length; i++) {
			$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
		}
	});
});
