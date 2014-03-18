// Handle Ajax and maintain list of data 
define('clientMongo', function(awsui) {'use strict';

	 var mongoData = [];

	function ClientMongo() {
		console.log("Client Mongo constructor called");
		$("#insertMdTransConfig").click(insertMdTransConfigDocument);
		$("#saveConfigS3").click(insertNewDocument);
		readAll();
		loadNewOptionsDefault();
	}

	var loadNewOptionsDefault = function(awsui) {
		console.log("loadNewOptions called");
	        $("#newPathToPython").val(awsui.options.pathToPython);
	        $("#newCopyFrom").val(awsui.options.copyFrom);
	        $("#newCopyTo").val(awsui.options.copyTo);
	        $("#newFilesToCopy").val(awsui.options.filesToCopy);

	        //$("#currentDocument").html(dataIndex + 1);
	        $("#newPathToConfig").val(awsui.options.pathToConfig);
	        $("#newReallyWrite").val(awsui.options.reallyWrite ? "true" : "false");
	        $("#newBucketName").val(awsui.options.bucketName);
	        $("#newFolderToWalk").val(awsui.options.folderToWalk);
	        $("#newS3RootFolder").val(awsui.options.s3RootFolder);
	        $("#newCreateFolderToWalkOnS3").val(awsui.options.createFolderToWalkOnS3 ? "true" : "false");
	        $("#newCreateIndex").val(awsui.options.createIndex ? "true" : "false");
	        $("#newFilesToIgnore").val(awsui.options.filesToIgnore);
	};
	
	var saveNewOptions = function(awsui) {
		console.log("saveNewOptions called");
		var newOptions = awsui.options;
		// ADD CODE TO SAVE VALUES TO OBJECT MdTransConfig Object
        newOptions.pathToPython = $("#newPathToPython").val();
        newOptions.copyFrom = $("#newCopyFrom").val();
        newOptions.copyTo = $("#newCopyTo").val();
        newOptions.filesToCopy = $("#newFilesToCopy").val();
        
        var mdTransConfig = {
				"pathToPython": newOptions.pathToPython,
				"copyFrom": newOptions.copyFrom,
				"copyTo": newOptions.copyTo,
				"filesToCopy": newOptions.filesToCopy
			};
        
        // ADD CODE TO SAVE VALUES TO OBJECT awsConfig
        //newOptions.dataIndex = $("#currentDocument").html(dataIndex + 1);
        newOptions.pathToConfig = $("#newPathToConfig").val();
        newOptions.reallyWrite = $("#newReallyWrite").val();
        newOptions.bucketName = $("#newBucketName").val();
        newOptions.folderToWalk = $("#newFolderToWalk").val();
        newOptions.s3RootFolder = $("#newS3RootFolder").val();
        newOptions.createFolderToWalkOnS3 = $("#newCreateFolderToWalkOnS3").val();
        newOptions.createIndex = $("#newCreateIndex").val();
        newOptions.filesToIgnore = $("#newFilesToIgnore").val();
        var awsConfig = {
				"pathToConfig": newOptions.pathToConfig,		
				"reallyWrite": newOptions.reallyWrite, 
				"bucketName": newOptions.bucketName,
				"folderToWalk": newOptions.folderToWalk,
				"s3RootFolder": newOptions.s3RootFolder,
				"createFolderToWalkOnS3": newOptions.createFolderToWalkOnS3,
				"createIndex": newOptions.createIndex,
				"filesToIgnore": newOptions.filesToIgnore	
        };
        
		var config = [
				{
					type: "mdtrans",
					options: mdTransConfig
				},
				{
					type: "aws",
					options: awsConfig				
				}
		];
		
		// ADD CODE TO WRITE TO FILE
		
		// Code to Save config to Mongo
		request = {config: config};
		$.getJSON('/insertConfigJson', request, function(newData){
			console.log("insertConfigJson called");
			mongoData = mongoData.concat(newData.mongoDocument);
		});
		
	};
	
	var getDocument = function(event, request) {		
		request.callback(mongoData[request.index]);
	};

	var insertNewDocument = function(event, callback) {
		console.log("insert New Document called");
		$.getJSON('/insertJson', function(newData) {
			mongoData = mongoData.concat(newData.mongoDocument);			
			//callback(newData.mongoDocument, mongoData);			
		});
	};
	
	// NEW CMH - saves Markdown Transform Config file to MongoDB
	var insertMdTransConfigDocument = function(event, callback) {
		console.log("insert insertMdTransConfigDocument called");
		$.getJSON('/insertMdTransConfigJson', function(newData) {
			mongoData = mongoData.concat(newData.mongoDocument);			
			//callback(newData.mongoDocument, mongoData);			
		});
	};
	
	// NEW CMH - saves S3 Config file to MongoDB
	var insertS3ConfigDocument = function(event, callback) {
		console.log("insert insertS3ConfigDocument called");
		$.getJSON('/insertS3ConfigJson', function(newData) {
			mongoData = mongoData.concat(newData.mongoDocument);			
			//callback(newData.mongoDocument, mongoData);			
		});
	};

	var readAll = function(event, callback) {
		console.log("readAll called");
		$.getJSON('/readAll', function(data) {
			mongoData = data;
			//callback(data);
		});
	};

	var readTwo = function(event, callback) {
		console.log("readTwo called");
		$.getJSON('/readTwo', function(data) {
			mongoData = data;
			//callback(data);
		});
	};

	var readCountDocuments = function(event, publishedRequest) {
		console.log("readTwo called");
		var request = {};
		request.numRequested = publishedRequest.numRequested;
		$.getJSON('/readDocuments', request, function(data) {
			mongoData = data;
			publishedRequest.callback(mongoData);
		});

	}; 
	
	var removeAll = function(event, callback) {
		$.getJSON('/removeAll', function(data) {
			//callback(data);
		});
	};

	return ClientMongo; 
});

