var MongoData = (function() { 'use strict';

	var mongoData = null;
	var webServerURL = "http://localhost:30025";
	var that = null;

	function MongoData() {
		that = this;
		$("#uploadCollection").click(loadCollection);
		$("#deleteCollection").click(removeCollection);	
		//$("#backupCollection").click(backupCollection);	// MAKE METHOD backupCollection --> write to JSON file

		$("#getTitles").click(getTitles);			// uses queryAll to populate mongoData, then adds titles
		$("#poemContents").click(poemContents);		// uses local mongoData
		$("#searchKeywords").click(searchKeywords);	// uses local mongoData
		$("#addPoem").click(callAddPoem);
		$("#deletePoem").click(deletePoem);
		
		this.queryAll();				// populates local mongoData
		
	}

	// displays one record from the local mongoData as index identifies
	var displayRecord = function(index) {
		console.log("displayRecord called");
		
		$("#displayPoem").empty();
		
		var poem = "<hr/>" +
			"<h2>Title: " + mongoData[index].title + "</h2>"+
			"<h3>Author: " + mongoData[index].author + "</h3>"+
			"<h4>Keywords: " + mongoData[index].keywords + "</h4>"+
			"<hr/>"+
			"<p>" + mongoData[index].content + "<p>";
		
		$('#displayPoem').html(poem);
	};
	
	// displays one record from the database from ID
	MongoData.prototype.displayRecordID = function(id) {
		console.log("displayRecordID called, id: "+id);
		var request= {};
		request.selectedPoemID = id;
		$.getJSON(webServerURL+'/displayRecordID', request, function(obj) {
			poem = obj;
			console.log("The record was returned and SET as: " + poem);
			$("#displayPoem").empty();
			var html = 
				"<h2>Title: " + poem.title + "</h2>"+
				"<h3>Author: " + poem.author + "</h3>"+
				"<h4>Keywords: " + poem.keywords + "</h4>" +
				"<hr/>"+
				"<p>" + poem.content + "<p>";
			$('#displayPoem').html(html);
		});
	};
	
	// displays one record from the local array from ID
	var displayLocalID = function(id) {
		console.log("displayLocalID called, id: "+id);
		for(var i=0; i<mongoData.length; i=i+1){
			if(mongoData[i]._id === id){
				$("#displayPoem").empty();
				console.log("The record selected is: " + mongoData[i].title);
				var html = "<hr/>" +
					"<h2>Title: " + mongoData[i].title + "</h2>"+
					"<h3>Author: " + mongoData[i].author + "</h3>"+
					"<h4>Keywords: " + mongoData[i].keywords + "</h4>" +
					"<hr/>"+
					"<p>" + mongoData[i].content + "<p>";
				$('#displayPoem').html(html);
			}
		}
	};

	// displays one record as selected by user
	var poemContents = function() {
		console.log("poemContents called");
		var index = $("#poemTitles").val();
		console.log("index: " + index);
		displayRecord(index);
	};
	
	// displays titles in drop down, setting value to ID
	var getTitles = function() {
		console.log("getTitles called");
		
		$("#poemTitles").empty();
		for (var i=0; i< mongoData.length; i=i+1){
			//$('#poemTitles').append('<option value="' + mongoData[i]._id +'">' + mongoData[i].title + '</option>');
			$('#poemTitles').append('<option value="' + i +'">' + mongoData[i].title + '</option>');
		}
		console.log("MongoData First ID: "+ mongoData[0]._id + "  First Title Name: "+ mongoData[0].title);
		console.log("Titles Loaded");
	};
	
	// displays titles in list inside #dataDisplay, user selected poem displays in #displayPoem
	var displayTitleList = function(keyArray) {
		console.log("displayTitleList called");
		
		$("#dataDisplay").empty();
		$("#displayPoem").empty();
		
		var keyTitles = '<ul>Titles of poems with keyword:';
		for (var i=0; i< keyArray.length; i=i+1){
			var id = keyArray[i]._id;
			keyTitles = keyTitles+ '<li><a href="#displayPoem" id="'+id+'" class="link">' + keyArray[i].title + '</a></li>';
		}
		keyTitles = keyTitles + '</ul>';
		console.log("keyTitle html: "+ keyTitles);
		$("#dataDisplay").append(keyTitles);
		
		// adds link functionality for all with class 'link'
		$('.link').click(function(e) {
			e.preventDefault();
			var id = $(this).attr('id');
			displayLocalID(id);
		});
		
		console.log("TitleList Loaded");
	};
	
	// searches records that hold keywords as selected by user
	var searchKeywords = function() {
		console.log("searchKeywords called");
		
		var keyword = $("#keywords").val();
		console.log("User Keyword: " + keyword);
		var keyArray = [];
		for(var i=0; i<mongoData.length; i=i+1){
			// search each records keyword array within
			for(var j=0;j<mongoData[i].keywords.length; j=j+1){
				//console.log("inside keyword array, the keywords are: " + mongoData[i].keywords);
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
	
	// gets local copy of database in an array
	MongoData.prototype.queryAll = function() {
		console.log("client called queryAll");
		$.getJSON(webServerURL+'/queryAll', function(data) {
			console.log("--inside queryAll callback - getting mongoData...");
			mongoData = data;
		});
	};

	// private callback that updates local array when new poem added using addPoem(callback)
	var callAddPoem = function() {
		that.addPoem(function(data) {
			// local mongoData and title list refreshed
			for(var i=0; i<data.length; i=i+1) {
				var id = data[i]._id;
				var author = data[i].author;
				var content = data[i].content;
				var keywords = data[i].keywords;
				var title = data[i].title;
				
				var newPoem = { '_id': id, 'author': author, 'content': content, 'keywords': keywords, 'title': title };
				mongoData.push(newPoem);
			}
			getTitles();
			console.log("mongoData refreshed");
		});		
	};
	
	// adds data from JSON file on the server
	MongoData.prototype.addPoem = function(callback) {
		$.getJSON(webServerURL+'/insertRecord', callback);	
	};
	
	var deletePoem = function() {
		var currentPoemIndex = $("#poemTitles").val();
		var currentPoemID = mongoData[currentPoemIndex]._id; 
		var request= {};
		request.selectedPoemID = currentPoemID;	
		console.log("Delete Poem request ID: "+request.selectedPoemID);
		$.getJSON(webServerURL+'/removeRecordID', request, function(data) {
			// clears if any poem is displayed
			$("#displayPoem").empty();
			
			// removes the poem from the current local array
			console.log("remove ID from local array: "+currentPoemIndex);
			
			// update local array
			mongoData.splice(currentPoemIndex, 1);
			
			// refreshes title list
			getTitles();
			console.log("mongoData refreshed");
		});
	};
	
	// used in ADMIN section
	var loadCollection = function() {
		$.getJSON(webServerURL+'/loadCollection', function(data) {
			queryAll();
			// tells user that insert successful
			$('#adminNotes').append('<p>Collection Loaded: '+ data + '</p>');
		});
	};
	
	// used in ADMIN section
	var removeCollection = function() {
		$.getJSON(webServerURL+'/removeCollection', function(data) {
			
			// when collection removed, user should not have a list of titles for an empty collection
			$("#poemTitles").empty();
			mongoData = null;
			
			// tells user that remove was successful
			$('#adminNotes').append('<p>'+ data.result + '</p>');
		});
	};

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
