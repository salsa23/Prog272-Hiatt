define(['jquery'], function() {'use strict';
	var dbOptions = null;					// Download options
    
    function databaseUI() {
			$("#insertFiles").click(insertFiles);
			$("#readFiles").click(downloadFiles);
    };
    
    var saveOptions = function(){
		dbOptions.uploadDir = $("#uploadDir").val();
		dbOptions.fileType = $("#fileType").val();
		dbOptions.keywords = $("#keywords").val();
		dbOptions.saveToDir = $("#saveToDir").val();
	};
    
    var uploadFile = function(file){
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
		// read in file contents
		tempFile.content = JSON.parse(fs.readFileSync(file, 'utf8'));
		
		// upload to database
		var arrayToInsert = [ tempFile ];
		queryMongo.insertIntoCollection(response, arrayToInsert);
	};
    
    // walk the directories and do something
	var walkAndUpload = function() {
		var request = {
			query: { 
				uploadDir: dbOptions.uploadDir,
				fileType: dbOptions.fileType,
				keywords: dbOptions.keywords,
				saveToDir: dbOptions.saveToDir
				}
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
	
	var createFile = function(file){
		
	};
	
	// read from the database and download a local set
	var readAndDownload = function() {
		$.getJSON('/findInCollection', function(data) {
			for (var i = 0; i < data.files.length; i++) {
				// create file(s) and folders
				createFile(data.files[i]);
			}
		});
	};
	
	var insertFiles = function(){
		saveOptions();
		walkAndUpload();
	};
	
	var downloadFiles = function(){
		saveOptions();
		readAndDownload();
	};

    return databaseUI;
});
