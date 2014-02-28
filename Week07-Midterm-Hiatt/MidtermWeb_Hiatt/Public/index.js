var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {
		$("#uploadCollection").click(loadCollection);
		$("#deleteCollection").click(removeCollection);	
		//$("#backupCollection").click(backupCollection);	// MAKE METHOD backupCollection --> write to JSON file

		$("#getTitles").click(getTitles);			// uses queryAll to populate mongoData, then adds titles
		$("#poemContents").click(poemContents);		// uses local mongoData
		$("#searchKeywords").click(searchKeywords);	// uses local mongoData
		$("#addPoem").click(addPoem);
		$("#deletePoem").click(deletePoem);
		
		queryAll();				// populates local mongoData
		
	}

	// displays one record from the local mongoData as index identifies
	var displayRecord = function(index) {
		console.log("displayRecord called");
		
		$("#dataDisplay").empty();
		$("#searchResultsPoem").empty();
		
		var poem = 
			"<h2>Title: " + mongoData[index].title + "</h2>"+
			"<h3>Author: " + mongoData[index].author + "</h3>"+
			"<h4>Keywords: " + mongoData[index].keywords + "</h4>"+
			"<hr/>"+
			"<p>" + mongoData[index].content + "<p>";
		
		$('#dataDisplay').html(poem);
	};
	
	// displays one record from the database as index identifies
	var displayRecordID = function(id) {
		console.log("displayRecordID called, id: "+id);
		$.getJSON('/displayRecordID', function(obj) {
			poem = obj;
			console.log("The record was returned and SET as: " + poem);
			$("#dataDisplay").empty();
			$("#searchResultsPoem").empty();
			var html = 
				"<h2>Title: " + poem.title + "</h2>"+
				"<h3>Author: " + poem.author + "</h3>"+
				"<h4>Keywords: " + poem.keywords + "</h4>" +
				"<hr/>"+
				"<p>" + poem.content + "<p>";
			$('#dataDisplay').html(html);
		});
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
	
	// displays titles in list
	var displayTitleList = function(keyArray) {
		console.log("displayTitleList called");
		
		$("#dataDisplay").empty();
		$("#searchResultsPoem").empty();
		
		var keyTitles = '<ul>Titles of poems with keyword:';
		for (var i=0; i< keyArray.length; i=i+1){
			var id = keyArray[i]._id;
			//keyTitles = keyTitles+ '<li><a href="$(this).click(displayRecordID('+ id +'))">' + keyArray[i].title + '</a></li>';
			
			//keyTitles = keyTitles+ '<li><a href="$(".link").click(function(e){ e.preventDefault(); $("dataDisplay).load(<h2>Title: '+
			//	keyArray[i].title+'</h2><h3>Author: '+keyArray[i].author+'</h3><hr/><p>'+keyArray[i].content+'</p>");});">'+keyArray[i].title+'</a></li>';
			
			//keyTitles = keyTitles+ '<li><a href="#searchResultsPoem" id="'+id+'" class="link">' + keyArray[i].title + '</a></li>';
			keyTitles = keyTitles+ '<li><a href="javascript:void(0);" id="'+id+'" class="link">' + keyArray[i].title + '</a></li>';
		}
		keyTitles = keyTitles + '</ul>';
		console.log("keyTitle html: "+ keyTitles);
		$("#dataDisplay").append(keyTitles);
		
		// adds link functionality for all with class 'link'
		$('.link').click(function(e) {
			e.preventDefault();
			var id = $(this).attr('id');
			//var id = $(this).prop('id');
			displayRecordID(id);
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
	
	// displays database poem title elements in HTML buttons
	var queryAll = function() {
		$.getJSON('/readAll', function(data) {
			console.log("--inside readAll callback - getting mongoData...");
			mongoData = data;
			//console.log("mongoData in queryAll: " + mongoData);
			//console.log("Data in queryAll: " + data);
		});
	};
	
	var loadCollection = function() {
		$.getJSON('/loadCollection', function(data) {
			queryAll();
			// tells user that insert successful
			$('#adminNotes').append('<p>Collection Loaded: '+ data + '</p>');
		});
	};
	
	var removeCollection = function() {
		$.getJSON('/removeCollection', function(data) {
			
			// when collection removed, user should not have a list of titles for an empty collection
			$("#poemTitles").empty();
			mongoData = null;
			
			// tells user that remove was successful
			$('#adminNotes').append('<p>'+ data.result + '</p>');
		});
	};
	
	var addPoem = function() {
		$.getJSON('/insertRecord', function(data) {
			// when poem is added, mongoData and title list will need refreshed
			// for loop to populate from array sent back
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
			
			// tells user that insert successful
			$('#adminNotes').append('<p>'+ data.file +'File has been processed: </p>');
		});
	};
	
	var deletePoem = function() {
		var currentPoemIndex = $("#poemTitles").val();
		var currentPoemID = mongoData[currentPoemIndex]._id; 
		var request= {};
		request.selectedPoemID = currentPoemID;	
		console.log("Delete Poem request ID: "+request.selectedPoemID);
		$.getJSON('/removeRecordID', request, function(data) {
			// tells user that remove was successful
			// removes the poem from the current local array
			console.log("remove ID from local array: "+currentPoemIndex);
			mongoData.remove(currentPoemIndex);
			// refreshes title list
			getTitles();
			console.log("mongoData refreshed");
			$('#adminNotes').append('<p> Poems deleted: '+ data + '</p>');
		});
	};

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
