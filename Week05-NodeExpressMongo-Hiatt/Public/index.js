/**
 * @author Chelsa Hiatt
 */
function showData() {

	// button to select record to display
	$('#submit').click(getRecord);

	// get the selected record
	function getRecord(event) {
		var userChoice = $('#userChoice').val();
		$.getJSON('/read', function(data) {
			// set userChoice to one less to accommodate array numbering and user non-use of 0 when requesting the first record.
			userChoice = userChoice-1;
			if (userChoice >=0 && userChoice < data.length){
				// load to html
				$('#name').html('<p>' + data[userChoice].firstName + ' ' + data[userChoice].lastName + '<p>', function() {
					console.log("Name was loaded for object");
				});
				$('#address').html('<p>' + data[userChoice].address + '<p>', function() {
					console.log("Address was loaded for object");
				});
				$("#cityStateZip").html('<p>' + data[userChoice].city + ', ' + data[userChoice].state + ' ' + data[userChoice].zip + '<p>', function() {
					console.log("City, State, Zip was loaded for object ");
				});
			}else{
				$('#error').html("That record does not exist. Please enter a different number. NOTE: If you are trying to access the 0 record type 1.");	
			};
		});
	};

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
