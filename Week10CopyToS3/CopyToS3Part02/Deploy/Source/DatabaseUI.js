define(['jquery'], function() {'use strict';
	var dbOptions = {};					// Download options
	var filesToUpload = null;			// list of files to upload from walking directory
	var filesToDownload = null;			// array list of objects in database to download
    
    function databaseUI() {
			$("#insertFiles").click(insertFiles);
			$("#readFiles").click(downloadFiles);
    };
    
    var saveOptions = function(){
		dbOptions.uploadDir = $("#uploadDir").val();
		dbOptions.fileType = $("#fileType").val();
		var stringInput = $("#keywords").val();
		dbOptions.keywords = stringInput.split(",");
		dbOptions.saveToDir = $("#saveToDir").val();
	};
    
    var uploadFile = function(fileObject){
		console.log("uploadFile called: " +JSON.stringify(fileObject));
		for(var i=0; i<fileObject.length; i++){
			// strip out path and file name
			var folderPathFileString = fileObject[i];
			var pathArray = folderPathFileString.split("/");			// last in array is file name
			var fileString = pathArray[pathArray.length-1];
			var itemNameArray = fileString.split(".");					// first in array is file name, second is extension
			var itemName = itemNameArray[0];
			var itemExt = itemNameArray[1];
			var tempFile = {
				"fileType":"Markdown",
				"itemName": itemName,
				"fileName": fileString,
				"fileExt": itemExt,
				"folderPath": folderPathFileString,
				"keywords" : ["markdown", "sonnets"]
			};
			var request = {};
		
			// go get file contents and upload
			request.insertObject = tempFile;
			$.getJSON('/insertFile', request, function(newData){
				$("#walkList").append('<li>' + filesToUpload.files[i] + '</li>');
			});
		}
	};
/*
		// make an object
		var tempFile = {
			"fileType":"Markdown",
			"itemName": "Sonnet01",
			"fileName": "Sonnet01.md",
			"folderPath": "/home/adminuser/Dev/Dropbox/sonnetsMD",
			//"itemName": fileObject.name,
			//"fileName": fileObject.name+".md",
			//"folderPath": fileObject.path,
			"keywords" : ["markdown", "sonnets"]
			};

		// Code to insert into Mongo
		var request = {};
		
		// for testing using temp file created
		request.insertObject = tempFile;
		$.getJSON('/insertFile', request, function(newData){
			alert("Your file" + JSON.stringify(fileObject.fileName) + " was INSERTED");
		});
*/

    
    // walk the directories and do something
	var walkFilesDir = function() {
		saveOptions();
		var request = {
			"uploadDir": dbOptions.uploadDir,
			"fileType": dbOptions.fileType,
			//"keywords": dbOptions.keywords,
			"keywords": ["Markdown","sonnet"],
			"saveToDir": dbOptions.saveToDir,
			"walkArray": ""
			};
		$.getJSON('/walk', request, function(data) {
			console.log("inside /walk callback on client");
			//for (var i = 0; i < data.files.length; i++) {
				//console.log("In walkAndUpload callback");
				// show a list onscreen of files that were in list
				//$("#walkList").append('<li>' + data.files[i] + '</li>');
			//}
			request.walkArray = data.files;
			console.log(data.files);
			filesToUpload = data.files;
		});
	};
	
	var createFile = function(fileObject){
		$.getJSON('/exportFromDatabase', request, function(fileObject) {
			console.log("Successfully created "+JSON.stringify(fileObject.fileName));
		});
	};
	
	// read from the database and download a local set
	var searchKeywords = function() {
		// search for file type
		var request = { 
			search: { "keywords":"Markdown" }
		};
		$.getJSON('/findInCollection', request, function(data) {
			console.log("In searchKeywords callback, data returned is type: ");
			console.log(typeof data.files);
			console.log(JSON.stringify(data.files));
			for (var i = 0; i < data.files.length; i++) {
				// show a list onscreen of files that were in list
				$("#walkList").append('<li>' + data.files[i] + '</li>');
			}
			filesToDownload = data;
		});
	};
	
	var insertFiles = function(){
		saveOptions();
		walkFilesDir();
		uploadFile(filesToUpload);
	};
	
	var downloadFiles = function(){
		saveOptions();
		searchKeywords();
		createFile(filesToDownload);
	};

    return databaseUI;
});
