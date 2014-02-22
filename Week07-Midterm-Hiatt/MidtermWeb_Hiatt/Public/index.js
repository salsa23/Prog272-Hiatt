var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {		
		//$("#readAll").click(queryAll);
		//$("#readTwo").click(queryTwo);
		$("#showData").click(showData);				// calls function to display one record that user specifies
		
		$("#uploadCollection").click(loadCollection);
		//$("#deleteCollection").click(deleteAll);	// MAKE METHOD deleteAll --> remove collection
		//$("#backupCollection").click(backupAll);	// MAKE METHOD backupAll --> write to JSON file
	}

	// displays one record from the database as index identifies
	var displayRecord = function(index) {
		
		//$('#firstName').html(mongoData[index].firstName);
		//$('#lastName').html(mongoData[index].lastName);
		//$('#address').html(mongoData[index].address);
		//$('#city').html(mongoData[index].city);
		//$('#state').html(mongoData[index].state);
		//$('#zip').html(mongoData[index].zip);
	};

	// displays one record as selected by user
	var showData = function() {
		// get user value and compensate for lack of knowledge for indexing starting at 0
		var index = ($("#userIndex").val()-1);
		if(index>=0){
			displayRecord(index);
		}else{
			alert("That is not a valid record ID.");
		}
	};
	
	// displays titles as buttons
	var displayTitles = function() {
		for (var i=0; i< mongoData.length; i=i+1){
			
		}
	};
	
	// displays database poem title elements in HTML buttons
	var queryAll = function() {
		$.getJSON('/readAll', function(data) {
			console.log("--inside queryAll callback - getting data...");
			mongoData = data;
			console.log("mongoData in queryAll: " + mongoData);
			console.log("Data in queryAll: " + data);
			
			// displays list of database entries in HTML div #mongoData  <<<<<<<<<<<<<<<<<<<< POSSIBLY REMOVE IF NOT USING <<<<<
			$("#mongoData").empty();
			console.log("The title from index.js: " + data[i].title);
			for (var i = 0; i < data.length; i++) {
				$("#mongoData").append('<li>' + JSON.stringify(data[i].title) + '</li>');
			}
			
			//displayRecord(0);
			//displayTitles();	// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MAKE METHOD displayTitles --> write html file buttons <<<<<<<
			
			// displays list of database entries in HTML div #mongoData  <<<<<<<<<<<<<<<<<<<< POSSIBLY REMOVE IF NOT USING <<<<<
			// $("#mongoData").empty();
			// for (var i = 0; i < data.length; i++) {
			// $("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
			// }
		});
	};

	// displays 2 records of the database as list elements in HTML
	var queryTwo = function() {
		$.getJSON('/readTwo', function(data) {
			mongoData = data;
			console.log("The data was returned and SET as: " + data);
			displayRecord(0);
			
			// displays list of database entries in HTML div #mongoData  <<<<<<<<<<<<<<<<<<<< POSSIBLY REMOVE IF NOT USING <<<<<
			// $("#mongoData").empty();
			// for (var i = 0; i < data.length; i++) {
			//	$("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
			// }
		});
	};
	
	var loadDatabase = function() {
		$.getJSON('/loadDatabase', function(data) {
			// tells user that insert successful
			$('#adminNotes').append('<p>'+JSON.stringify(data[0]) + '</p>');
		});
	};

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
