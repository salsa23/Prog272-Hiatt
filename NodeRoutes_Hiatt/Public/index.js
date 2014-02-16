/**
 * @author Chelsa Hiatt
 * 
 * Calls made from client to the web server
 */

var RouteMaster = ( function() {

		// Constructor
		function RouteMaster() {
			$("#getFeet").click(getFeetParse);		// use function "getFeet" to return the object
			$("#getXFeet").click(getXFeet);
			$("#getCircumference").click(getCircumference);
		}

		var getFeet = function() {
			var getFeetResult = $('#getFeetResult');
			nineResult.load('/getFeet', function(response, status, xhr) {
				if (status == "error") {
					getFeetResult.html("Error: <strong>" + xhr.statusText + "</strong>");
				}
			});
		};
		
		// parses out the data result to text that is easier to read for the user.
		var getFeetParse = function() {
			var getFeetResult = $('#getFeetResult');
			$.get('/getFeet', function(data) {
				getFeetResult.html("One mile is <strong>" + data.result + "</strong> feet.");
			});
		};

		// passes an object with parameters to use in the function.
		var getXFeet = function() {
			var userMiles = $("#userMiles").val();

			$.ajax({
				url : "/getXFeet",
				type : "GET",
				data : {
					"userMiles" : userMiles
				},
				dataType : "json",
				success : function(data) {					
					$("#getXFeetResult").html(userMiles + " miles = " + data.result + " feet.");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		};

		var getCircumference = function() {
			var userRadius = $("#userRadius").val();

			$.ajax({
				url : "/getCircumference",
				type : "POST",
				data : {
					"userRadius" : userRadius
				},
				dataType : "json",
				success : function(data) {					
					$("#getCircumferenceResults").html("A circle with the radius of " + userRadius + " has a circumference of: " + data.result);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		};

		// Return constructor
		return RouteMaster;
	}());

$(document).ready(function() {
	new RouteMaster();
}); 