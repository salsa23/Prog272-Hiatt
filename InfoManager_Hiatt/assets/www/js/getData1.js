/**
 * @author Chelsa Hiatt
 */

function MyData() {
	this.getData = function() {

		// gets from [] in json file, calls a function to update the HTML file
		$.getJSON('js/index.json', function(data) {
			var result = " ";
			// loads the whole contents
			for (var i = 0; i < data.length; i = i + 1) {
				result = result + "<p>First Name: " + data[i].firstName + "</p>";
				result = result + "<p>Last Name: " + data[i].lastName + "</p>";
			}
			$("#Div01").html(result);
		});
	};

	this.getHtml = function() {
		// load the whole file into the div
		$('#Div02').load("source/source.html", function() {
			console.log("Load was performed");
		});

		// if you want to load from a specific paragraph in sources:
		//$('#resultDiv02').load("sources.html #paragraph02", function() {
		//	console.log("Load was performed");
		//});
	};
		this.getHtml2 = function() {
		// uses JQuery .load() depending on index button selected
		if ( i === 1) {
			// loads paragraph01
			$('#Div01').load("source/source.html #paragraph01", function() {
				console.log("Load was performed");
			});
		}
		if ( i === 2) {
			// loads paragraph02
			$('#Div01').load("source/source.html #paragraph02", function() {
				console.log("Load was performed");
			});
		}
		if ( i === 3) {
			// loads paragraph03
			$('#Div01').load("source/source.html #paragraph03", function() {
				console.log("Load was performed");
			});
		}
	};
}


$(document).ready(function() {
	var myData = new MyData();
	myData.getData();
	myData.getHtml();
});
