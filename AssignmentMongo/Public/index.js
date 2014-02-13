/**
 * @author Chelsa Hiatt
 */


$(document).ready(function() {

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

	$.getJSON('/read', function(data) {
		//console.log(data);
		for (var i = 0; i < data.length; i++) {
			$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
		}
	});
});
