var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {		
		//$("#readTwo").click(queryTwo);
		
		$("#uploadCollection").click(loadCollection);
		$("#deleteCollection").click(removeCollection);	
		//$("#backupCollection").click(backupCollection);	// MAKE METHOD backupCollection --> write to JSON file

		$("#getTitles").click(getTitles);			// uses queryAll to populate mongoData, then adds titles
		$("#poemContents").click(poemContents);		// uses local mongoData
		$("#searchKeywords").click(searchKeywords);	// uses local mongoData
		$("#addPoem").click(addPoem);
		$("#deletePoem").click(deletePoem);
		$("#showData").click(showData);				// calls function to display one record that user specifies
	}

	// displays one record from the database as index identifies
	var displayRecord = function(index) {
		console.log("displayRecord called");
		$('#dataDisplay').empty();
		var poem = 
			"<h2>Title: " + mongoData[index].title + "</h2>"+
			"<h3>Author: " + mongoData[index].author + "</h3>"+
			"<hr/>"+
			"<p>" + mongoData[index].content + "<p>";
		$('#dataDisplay').html(poem);
	};

	// displays one record as selected by user
	var poemContents = function() {
		console.log("poemContents called");
		var index = $("#poemTitles").val();
		console.log("index: " + index);
		displayRecord(index);
	};
	
	// MAY NOT USE --- displays one record as selected by user -- see poemContents
	var showData = function() {
		console.log("showData called");
		var index = $("select.#poemTitles").val();
		console.log("index: " + index);
		
		if(index>=0){
			displayRecord(index);
		}else{
			alert("That is not a valid record ID.");
		}
	};
	
	// displays titles in dropdown, setting value to ID
	var getTitles = function() {
		console.log("getTitles called");
		queryAll();				// refreshes the mongoData
		
		$("#poemTitles").empty();
		for (var i=0; i< mongoData.length; i=i+1){
			//$("#mongoData").append('<li>'+mongoData[i].title + '<li>');
			//$('#poemTitles').append('<option value="' + mongoData[i]._id +'">' + mongoData[i].title + '</option>');
			$('#poemTitles').append('<option value="' + i +'">' + mongoData[i].title + '</option>');
		}
		console.log("MongoData First ID: "+ mongoData[0]._id + "  First Title Name: "+ mongoData[0].title);
		console.log("Titles Loaded");
	};
	
	// displays titles in list
	var displayTitleList = function(keyArray) {
		console.log("displayTitleList called");
		
		$("#dataDisplay").empty();
		var keyTitles = '<ul>';
		for (var i=0; i< keyArray.length; i=i+1){
			keyTitles = keyTitles+ '<li>' + keyArray[i].title + '<li>';
		}
		keyTitles = keyTitles + '</ul>';
		console.log("keyTitle html: "+ keyTitles);
		console.log("TitleList Loaded");
	};
	
	// searches records that hold keywords as selected by user
	var searchKeywords = function() {
		console.log("searchKeywords called");
		queryAll();				// refreshes the mongoData
		
		var keyword = $("#keywords").val();
		console.log("User Keyword: " + keyword);
		var keyArray = [];
		for(var i=0; i<mongoData.length; i+i+1){
			// search each records keyword array within
			for(var j=0;j<mongoData[i].keywords.length; j=j+1){
				console.log("inside keyword array, the keywords are: " + mongoData[i].keywords);
				if(mongoData[i].keywords[j] === keyword){
					console.log("found the keyword: " + keyword);
					keyArray.push(mongoData[i]);
					console.log("pushed object into array: " + mongoData[i]);
				}
			}
		}
		console.log("keyArray: "+ keyArray);
		displayTitleList(keyArray);
		console.log("keyword search complete");
	};
	
	// displays database poem title elements in HTML buttons
	var queryAll = function() {
		$.getJSON('/readAll', function(data) {
			console.log("--inside queryAll callback - getting data...");
			mongoData = data;
			console.log("mongoData in queryAll: " + mongoData);
			//console.log("Data in queryAll: " + data);
			
			//displayRecord(0);
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
	
	var loadCollection = function() {
		$.getJSON('/loadCollection', function(data) {
			// tells user that insert successful
			$('#adminNotes').append('<p>'+ data.result + '</p>');
		});
	};
	
	var removeCollection = function() {
		$.getJSON('/removeCollection', function(data) {
			// tells user that remove was successful
			$('#adminNotes').append('<p>'+ data.result + '</p>');
		});
	};

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
