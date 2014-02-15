/**
 * @author Chelsa Hiatt
 */
function showData() {
	var i = $('#userChoice').val();
	console.log(i);
	
	// button to select record to display
	$('#submit').click({x : $('#userChoice').val()}, getRecord);

	// get the selected record
	function getRecord(event) {
		$.getJSON('/read', function(data) {
			// set x to x-1 to accommodate array numbering and user non-use of 0 when requesting the first record.
			var x = (event.data.x - 1);
			//var x = (event.x - 1);
			if (x >=0 && x < data.length){
				// load to html
				$('#name').html('<p>' + data[x].firstName + ' ' + data[x].lastName + '<p>', function() {
					console.log("Name was loaded for object");
				});
				$('#address').html('<p>' + data[x].address + '<p>', function() {
					console.log("Address was loaded for object");
				});
				$("#cityStateZip").html('<p>' + data[x].city + ', ' + data[x].state + ' ' + data[x].zip + '<p>', function() {
					console.log("City, State, Zip was loaded for object ");
				});
			}else{
				$('#error').html("That record number does not exist. Please enter a different number.");	
			};
		});
	};

	// displays one record in the html page from the returned data <<<<<<<<<<<<<<<<<<<<< Remove to test
	//$.getJSON('/read', function(data) {
	// load to html
	//	$('#name').html('<p>'+data[1].firstName + ' ' + data[1].lastName+'<p>', function(){
	//		console.log("Name was loaded for object");
	//	});
	//	$('#address').html('<p>'+data[1].address+'<p>', function(){
	//		console.log("Address was loaded for object");
	//	});
	//	$("#cityStateZip").html('<p>'+data[1].city + ', '+data[1].state + ' ' + data[1].zip+'<p>', function(){
	//		console.log("City, State, Zip was loaded for object ");
	//	});
	//});

	$.getJSON('/read', function(data) {
		//console.log(data);
		for (var i = 0; i < data.length; i++) {
			$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
		}
	});

};

$(document).ready(function() {
	showData();
});
