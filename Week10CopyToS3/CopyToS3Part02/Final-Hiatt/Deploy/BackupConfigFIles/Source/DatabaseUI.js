define(['jquery'], function() {'use strict';
	var dbOptions = {};					// Download options
    
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
		// make an object
		var tempFile = {
			"fileType":"Markdown",
			"itemName": "Sonnet01",
			"fileName": "Sonnet01.md",
			"folderPath": "/home/adminuser/Dev/Dropbox/sonnetsMD",
			//"itemName": file.name,
			//"fileName": file.name+".md",
			//"folderPath": file.path,
			"keywords" : ["markdown", "sonnets"]
			};
		// read in file contents NEEDS TO BE DONE ON FILE SERVER (app.js)!!!!!! <<<<<<<<<<<<<<<<<<<<<<
		var file = tempFile.folderPath+"/"+"Sonnet01.md";
		tempFile.content = JSON.parse(fs.readFileSync(file, 'utf8'));
		console.log("tempFile to upload"+ JSON.stringify(tempFile));
		// upload to database
		var arrayToInsert = [ tempFile ];
		queryMongo.insertIntoCollection(response, arrayToInsert);
	};
    
    // walk the directories and do something
	var walkFilesDir = function() {
		saveOptions();
		var request = {
			"uploadDir": dbOptions.uploadDir,
			"fileType": dbOptions.fileType,
			"keywords": dbOptions.keywords,
			"saveToDir": dbOptions.saveToDir
			};
		$.getJSON('/walk', function(data) {
			for (var i = 0; i < data.files.length; i++) {
				console.log("In walkAndUpload callback, data returned is type: ");
				console.log(typeof data.files);
				
				// upload file(s)
				uploadFile(data.files[i]);
				// show a list onscreen of files that were in list
				$("#walkList").append('<li>' + data.files[i] + '</li>');
			}
		});
	};
	
	var createFile = function(fileObject){
		$.getJSON('/exportFromDatabase', request, function(fileObject) {
			console.log("Successfully created "+JSONstringify(fileObject.fileName));
		});
	};
	
	// read from the database and download a local set
	var searchAndWrite = function() {
		// search for file type
		var request = { 
			search: { "keywords":"Markdown" }
		};
		$.getJSON('/findInCollection', request, function(data) {
			for (var i = 0; i < data.files.length; i++) {
				// create file(s) and folders
				console.log(JSON.stringify(data.files[i]));
				//createFile(data.files[i]);
			}
		});
	};
	
	var insertFiles = function(){
		saveOptions();
		walkFilesDir();
		uploadFile();
	};
	
	var downloadFiles = function(){
		saveOptions();
		searchAndWrite();
	};

    return databaseUI;
});
