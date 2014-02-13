/**
 * @author Chelsa Hiatt
 */


$(document).ready(function() {

	$.getJSON('/read', function(data) {
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			$("#results").append('<li>' + JSON.stringify(data[i]) + '</li>');
		}
	});
});
