/**
 * @author Chelsa Hiatt
 */

function NodeData() {'use strict';
	//button that gets user choice
	$("#submit").click(getDataPrivate);

	var choice = 1;
	var that = this;

	// private getDataPrivate that passes user info.
	function getDataPrivate() {
		// set choice from user
		var choice = parseInt(document.getElementById("userChoice").value);

		// call public function
		var results = that.getData(choice);

		// update html with results
		$("#return").html(results);
	}

	// public getData call from button.
	this.getData = function(choice) {
		$.getJSON('Public/data.json', function(data) {
			var name = data[choice - 1].firstName + " " + data[choice - 1].lastName;
			var address = data[choice - 1].address;
			var cityStateZip = data[choice - 1].city + ", " + data[choice - 1].state + " " + data[choice - 1].zip;
			var results = "<p>" + name + "</p>" + "<p>" + address + "</p>" + "<p>" + cityStateZip + "</p>";
			//$("#name").html(name);
			//$("#address").html(address);
			//$("#cityStateZip").html(cityStateZip);
			//$("#lastName").html(data[choice - 1].lastName);

			return results;

		}).success(function() {
			console.log("success");
		}).error(function(jqXHR, textStatus, errorThrown) {
			alert("error calling JSON. Try JSONLint or JSLint: " + textStatus);
		}).complete(function() {
			console.log("complete");
		});
	};




$(document).ready(function() {
	NodeData();
});
}