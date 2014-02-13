/**
 * @author Chelsa Hiatt
 */


$(document).ready(function() {

	// displays one record in the application
	$.getJSON('/read', function(data) {
		console.log(data[1]);
		console.log("The first name is: "+ data[1].firstName);
		
				//$('#Div01').load("source/source.html #paragraph01", function() {
				//console.log("Load source01 was performed");
				//});
				
		// load to html
		$('#name').html('<p>'+data[1].firstName + ' ' + data[1].lastName+'<p>', function(){
			console.log("Name was loaded for object " + data.valueOf);
		});
		$('#address').html('<p>'+data[1].address+'<p>', function(){
			console.log("Address was loaded for object " + data.valueOf);
		});
		$("#cityStateZip").html('<p>'+data[1].city + ', '+data[1].state + ' ' + data[1].zip+'<p>', function(){
			console.log("City, State, Zip was loaded for object " + data.valueOf);
		});
		
	});

	$.getJSON('/read', function(data) {
		//console.log(data);
		for (var i = 0; i < data.length; i++) {
			$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
		}
	});
});
