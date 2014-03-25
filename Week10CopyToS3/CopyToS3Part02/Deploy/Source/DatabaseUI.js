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
			"itemName": file.name,
			"fileName": file.name+".md",
			"folderPath": file.path,
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
		$.getJSON('/walk', function(data) {
			for (var i = 0; i < data.files.length; i++) {
				// upload file(s)
				uploadFile(data.files[i]);
			}
		});
	};
	
	var createFile = function(file){
		//create file with contents
		
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
