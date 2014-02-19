var MongoData = (function() { 'use strict';

	// global pointer to JSON object from MongoDB - starts off with null
	var mongoData = null;

	function MongoData() {		
		$("#readAll").click(queryAll);
		$("#readTwo").click(queryTwo);
		$("#showData").click(showData);
		$("#insert").click(insertRecord);
	}

	var displayRecord = function(index) {
		$('#firstName').html(mongoData[index].firstName);
		$('#lastName').html(mongoData[index].lastName);
		$('#address').html(mongoData[index].address);
		$('#city').html(mongoData[index].city);
		$('#state').html(mongoData[index].state);
		$('#zip').html(mongoData[index].zip);
	};

	var showData = function() {
		var index = $("#userIndex").val();
		displayRecord(index);
	};

	var queryAll = function() {
		// uses getJSON because it returns a JSON file
		$.getJSON('/readAll', function(data) {
			// set the global variable for mongo data
			mongoData = data;
			// sanity check on data
			console.log(data);
			// show first record
			displayRecord(0);
			// mongoData points to index.html id. "empty" will delete
			$("#mongoData").empty();
			for (var i = 0; i < data.length; i++) {
				$("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};

	var queryTwo = function() {
		$.getJSON('/readTwo', function(data) {
			mongoData = data;
			console.log(data);
			displayRecord(0);
			$("#mongoData").empty();
			for (var i = 0; i < data.length; i++) {
				$("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};

	var insertRecord = function() {
		$.getJSON('/insertRecord', function(data) {
			// tells user that insert successful
			alert(data);
		});
	};
	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
