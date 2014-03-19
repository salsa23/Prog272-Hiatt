define(['jquery'], function() {'use strict';

    var buttons = null;
    var options = null;
    var transformOptions = null;
    var dataIndex = 0;
    var dataIndexTransform = 0;
    var useInput = false;

    function AwsUi(useInputInit) {
		if (typeof useInputInit === 'undefined') {
			$("#listBuckets").click(listBuckets);
			$("#copyToS3").click(copyToS3);
			$("#getOptions").click(getOptions);
			$("#transformForwardButton").click(forwardTransform);
			$("#tranformBackButton").click(backwardTransform);
			$("#forwardButton").click(forward);
			$("#backButton").click(backward);
			$("#insertMdTransConfig").click(insertMdTransConfigDocument);
			$("#insertConfigS3").click(insertS3ConfigDocument);
			$("#buildAll").click(buildAll);
			getBuildConfig();
			getOptions();
		} else {
			useInput = useInputInit;
			$("#listBuckets").click(listBuckets);
			$("#copyToS3").click(copyToS3);
			$("#getOptions").click(getOptions);
			$("#transformForwardButton").click(forwardTransform);
			$("#tranformBackButton").click(backwardTransform);
			$("#forwardButton").click(forward);
			$("#backButton").click(backward);
			$("#insertMdTransConfig").click(insertMdTransConfigDocument);
			$("#insertConfigS3").click(insertS3ConfigDocument);
			$("#saveInputConfig").click(saveInputOptions);
			$("#buildAll").click(buildAll);
			getBuildConfig();
			getOptions();
		}

    }

    var buildAll = function() {
        $.getJSON("/buildAll", {
            options : JSON.stringify(transformOptions),
            index : dataIndexTransform
        }, function(result) {
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    };

    var copyToS3 = function() {
        $.getJSON("/copyToS3", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            $("#copyResult").html("Result: " + data.result);
        });
    };
    
    // NEW ADDED CMH to copy files to Mongo from Folder
    var copyToMongo = function() {
        $.getJSON("/copyToMongo", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            $("#copyDBResult").html("Result: " + data.result);
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
    
    // NEW ADDED CMH to save input config changes to Mongo
    var saveInputOptions = function() {
		console.log("saveInputOptions called");
		var newOptions = {};
		
		// ADD CODE TO SAVE VALUES TO OBJECT MdTransConfig Object
        newOptions.pathToPython = $("#newPathToPython").val();
        newOptions.copyFrom = $("#newCopyFrom").val();
        newOptions.copyTo = $("#newCopyTo").val();
        newOptions.filesToCopy = $("#newFilesToCopy").val();
        
        var mdTransConfig = {
				"type":"mdTransConfig",
				"pathToPython": newOptions.pathToPython,
				"copyFrom": newOptions.copyFrom,
				"copyTo": newOptions.copyTo,
				"filesToCopy": newOptions.filesToCopy
			};
        
        // ADD CODE TO SAVE VALUES TO OBJECT awsConfig
        newOptions.pathToConfig = $("#newPathToConfig").val();
        newOptions.reallyWrite = $("#newReallyWrite").val();
        newOptions.bucketName = $("#newBucketName").val();
        newOptions.folderToWalk = $("#newFolderToWalk").val();
        newOptions.s3RootFolder = $("#newS3RootFolder").val();
        newOptions.createFolderToWalkOnS3 = $("#newCreateFolderToWalkOnS3").val();
        newOptions.createIndex = $("#newCreateIndex").val();
        newOptions.filesToIgnore = $("#newFilesToIgnore").val();
        var awsConfig = {
				"type": "awsConfig",
				"pathToConfig": newOptions.pathToConfig,		
				"reallyWrite": newOptions.reallyWrite, 
				"bucketName": newOptions.bucketName,
				"folderToWalk": newOptions.folderToWalk,
				"s3RootFolder": newOptions.s3RootFolder,
				"createFolderToWalkOnS3": newOptions.createFolderToWalkOnS3,
				"createIndex": newOptions.createIndex,
				"filesToIgnore": newOptions.filesToIgnore	
        };
        
		var config = [ mdTransConfig, awsConfig ];
		
		// ADD CODE TO WRITE TO FILE
		// TO BE ADDED IN THE FUTURE
		
		// Code to Save config to Mongo
		var request = {};
		request.insertObject = config;
		$.getJSON('/insertConfigJson', request, function(newData){
			console.log("insertConfigJson called");
		});
		
	};


    var displayTransformConfig = function(options) {
		if (useInput) {
	        $("#newPathToPython").val(options.pathToPython);
	        $("#newCopyFrom").val(options.copyFrom);
	        $("#newCopyTo").val(options.copyTo);
	        $("#newFilesToCopy").val(options.filesToCopy);
	        $("#pathToPython").html(options.pathToPython);
			$("#copyFrom").html(options.copyFrom);
			$("#copyTo").html(options.copyTo);
			$("#filesToCopy").html(options.filesToCopy);
		} else {
			$("#pathToPython").html(options.pathToPython);
			$("#copyFrom").html(options.copyFrom);
			$("#copyTo").html(options.copyTo);
			$("#filesToCopy").html(options.filesToCopy);
		}
    };

    var displayOptions = function(options) {
		if (useInput) {
			$("#currentDocument").html(dataIndex + 1);
			$("#pathToConfig").html(options.pathToConfig);
			$("#reallyWrite").html(options.reallyWrite ? "true" : "false");
			$("#bucketName").html(options.bucketName);
			$("#folderToWalk").html(options.folderToWalk);
			$("#s3RootFolder").html(options.s3RootFolder);
			$("#createFolderToWalkOnS3").html(options.createFolderToWalkOnS3 ? "true" : "false");
			$("#createIndex").html(options.createIndex ? "true" : "false");
			$("#filesToIgnore").html(options.filesToIgnore);
      
	        //$("#currentDocument").html(dataIndex + 1);
	        $("#newPathToConfig").val(options.pathToConfig);
	        $("#newReallyWrite").val(options.reallyWrite ? "true" : "false");
	        $("#newBucketName").val(options.bucketName);
	        $("#newFolderToWalk").val(options.folderToWalk);
	        $("#newS3RootFolder").val(options.s3RootFolder);
	        $("#newCreateFolderToWalkOnS3").val(options.createFolderToWalkOnS3 ? "true" : "false");
	        $("#newCreateIndex").val(options.createIndex ? "true" : "false");
	        $("#newFilesToIgnore").val(options.filesToIgnore);
		} else {
			$("#currentDocument").html(dataIndex + 1);
			$("#pathToConfig").html(options.pathToConfig);
			$("#reallyWrite").html(options.reallyWrite ? "true" : "false");
			$("#bucketName").html(options.bucketName);
			$("#folderToWalk").html(options.folderToWalk);
			$("#s3RootFolder").html(options.s3RootFolder);
			$("#createFolderToWalkOnS3").html(options.createFolderToWalkOnS3 ? "true" : "false");
			$("#createIndex").html(options.createIndex ? "true" : "false");
			$("#filesToIgnore").html(options.filesToIgnore);
		}
    };

    var getBuildConfig = function() {
        $.getJSON("/getBuildConfig", function(optionsInit) {
            transformOptions = optionsInit;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
    var getOptions = function() {
        $.getJSON("/getOptions", function(optionsInit) {
            options = optionsInit;
            $('#documentCount').html(options.length);
            displayOptions(options[0]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };

    var forwardTransform = function() {
        if (dataIndexTransform < transformOptions.length - 1) {
            dataIndexTransform++;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }
    };

    var backwardTransform = function() {
        if (dataIndexTransform > 0) {
            dataIndexTransform--;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            return dataIndexTransform;
        }
        return dataIndexTransform;
    };

    var forward = function() {
        if (dataIndex < options.length - 1) {
            dataIndex++;
            displayOptions(options[dataIndex]);
        }
    };

    var backward = function() {
        if (dataIndex > 0) {
            dataIndex--;
            displayOptions(options[dataIndex]);
            return true;
        }
        return false;
    };

    var listBuckets = function() {
        $.getJSON("/listBuckets", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#buckets").append("<li>" + data[i] + "</li>");
            }
        });
    };

    return AwsUi;
});
/*
 $(document).ready(function() { 'use strict';
 new AwsUi();
 }); */
